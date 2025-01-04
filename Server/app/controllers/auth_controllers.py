from datetime import datetime
from email import message
from enum import Enum
from typing import Annotated
from uuid import uuid4
import json
import jwt
import bcrypt

from fastapi import HTTPException, Request, Response, Form, Cookie
from fastapi.responses import JSONResponse, RedirectResponse

from app.utils.auth import sign_access_token, verify_token
from app.utils.twoFA import generate_2fa_code, verify_2fa_code
from app.database.database import User as us, db, Doctor, Patient, Admin
from app.enums.roles import Roles
from app.models.user import Registration_input, Login_input

class UserRole(str, Enum):
    """Enum for user roles in the system."""
    DOCTOR = "doctor"
    PATIENT = "patient"
    ADMIN = "admin"

async def registeration(User: Registration_input) -> Response:
    """
    Register a new user in the system.
    
    Args:
        User (Registration_input): User registration data
        
    Returns:
        Response: JSON response with user data
        
    Raises:
        HTTPException: 400 if validation fails or user exists
                      500 if database operation fails
    """
    user = dict(User)
    
    # Validate required fields
    required_fields = {
        'password': 'Password is required',
        'email': 'Email is required',
        'name': 'Name is required',
        'role': 'Role is required'
    }
    
    for field, message in required_fields.items():
        if not user.get(field):
            raise HTTPException(400, detail=message)
    
    # Validate role
    try:
        role = UserRole(user["role"].lower())  
        user["role"] = role.value  
    except ValueError:
        raise HTTPException(400, detail=f"Invalid role. Must be one of: {', '.join([r.value for r in UserRole])}")

    # Check if user exists
    user_query = us.find(email=user["email"])
    db.execute_query(user_query, params=(user["email"],))
    if db.fetch_one():
        raise HTTPException(400, detail='user already exists')

    # Hash password
    salt = bcrypt.gensalt(10)
    user["password"] = bcrypt.hashpw(user['password'].encode('utf-8'), salt).decode('utf-8')
    
    # Generate user ID
    userId = ''.join(filter(str.isdigit, str(uuid4())))
    userId = int(userId[:6])

    # Process date of birth
    try:
        if user["date_of_birth"]:
            date_obj = datetime.strptime(user["date_of_birth"], '%Y-%m-%d')
            user["date_of_birth"] = date_obj.strftime('%Y-%m-%d')
    except ValueError as e:
        raise HTTPException(400, detail=f"Invalid date format for date_of_birth. Use YYYY-MM-DD: {str(e)}")

    # Create user
    try:
        usa = us.create(
            user_id=userId,
            Name=user['name'],
            Email=user["email"],
            PhoneNumber=user["phone_number"],
            DateOfBirth=user["date_of_birth"],
            Password=user["password"],
            role=user["role"],
            gender=user["gender"],
            profile_picture_url=user["pfpUrl"]
        )
        db.execute_query(usa)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error registering user: {str(e)}")

    # Create role-specific profile
    try:
        if user['role'] == "doctor":
            doctor = Doctor.create(
                user_id=userId,
                speciality=user['speciality'],
                experience=user['experience'],
                max_appointments_in_day=user['max_appointments_in_day'],
                teleconsultation_available=user['teleconsultation_available'],
                office_location=user['office_location'],
                office_location_url=user['office_location_url']
            )
            db.execute_query(doctor)
        elif user['role'] == "patient":
            patient = Patient.create(user_id=userId)
            db.execute_query(patient)
        elif user['role'] == "admin":
            admin = Admin.create(
                user_id=userId,
                two_factor_auth_enabled=True,
                last_login=datetime.now().isoformat()
            )
            db.execute_query(admin)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating {user['role']} profile: {str(e)}")

    return Response(content=json.dumps(user), media_type="application/json", status_code=201)

def login(userCredentials: Login_input, response: Response) -> JSONResponse:
    """
    Authenticate a user and generate access tokens.
    
    Args:
        userCredentials (Login_input): User login credentials
        response (Response): FastAPI response object
        
    Returns:
        JSONResponse: Response with access token or 2FA request
        
    Raises:
        HTTPException: 400 if credentials are invalid
    """
    userCredentials = dict(userCredentials)
    email = userCredentials["email"]
    password = userCredentials["password"]

    # Find user
    user_query = us.find(email=email)
    db.execute_query(user_query, params=(email,))
    user_found = db.fetch_one()
    
    if not user_found:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    user_found = {
        "password": user_found[6],
        "email": user_found[3],
        "role": user_found[9],
        "user_id": user_found[0]
    }

    # Verify password
    try:
        if not bcrypt.checkpw(password.encode('utf-8'), user_found["password"].encode('utf-8')):
            raise HTTPException(status_code=400, detail="Invalid credentials")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Generate tokens
    access_token = sign_access_token({"email": user_found["email"], "role": user_found["role"]}, 'access')
    refresh_token = sign_access_token({"email": user_found["email"], "role": user_found["role"]}, 'refresh')
    
    # Update refresh token in database
    logged_user_query = us.update(refresh_token=refresh_token, user_id=user_found["user_id"])
    db.execute_query(logged_user_query, params=(refresh_token, user_found["user_id"]))

    # Handle admin 2FA
    if user_found["role"] == "admin":
        found_admin = Admin.find(user_id=user_found["user_id"])
        db.execute_query(found_admin, params=(user_found["user_id"],))
        found_admin = db.fetch_one()
        
        if found_admin[1]:  # If 2FA is enabled
            generate_2fa_code(receiver=user_found["email"])
            temp_2fa_token = sign_access_token(
                {"email": user_found["email"], "user_id": user_found["user_id"]},
                "2fa"
            )
            return JSONResponse(
                content={"message": "2FA code sent to your email."},
                status_code=200,
                headers={"Set-Cookie": f"temp_2fa_token={temp_2fa_token}; HttpOnly; Max-Age=300; SameSite=Lax"}
            )

        # Update admin last login
        Admin_query = Admin.update(last_login=datetime.now().isoformat(), user_id=user_found["user_id"])
        db.execute_query(Admin_query, params=(datetime.now().isoformat(), user_found["user_id"]))

    return JSONResponse(
        content={"accessToken": access_token},
        status_code=200,
        headers={"Set-Cookie": f"jwt={refresh_token}; HttpOnly; Max-Age=1800; SameSite=Lax"}
    )

def logout(response: Response, request: Request) -> dict:
    """
    Log out a user by invalidating their refresh token.
    
    Args:
        response (Response): FastAPI response object
        request (Request): FastAPI request object
        
    Returns:
        dict: Message indicating logout status
    """
    cookies = request.cookies.get("jwt")
    if not cookies:
        return {"message": "Already logged out"}

    user = us.find(refresh_token=cookies)
    db.execute_query(user, params=(cookies,))
    user_data = db.fetch_one()
    
    if not user_data:
        response.delete_cookie('jwt')
        return {"message": "No active session found"}
    
    # Clear refresh token
    logged_user_query = us.update(refresh_token="", user_id=user_data[0])
    db.execute_query(logged_user_query, params=("", user_data[0]))
    response.delete_cookie('jwt')
    return {"message": "User has been logged out"}

def handle_refresh_token(response: Response, request: Request) -> dict:
    """
    Handle refresh token to generate new access token.
    
    Args:
        response (Response): FastAPI response object
        request (Request): FastAPI request object
        
    Returns:
        dict: New access token
        
    Raises:
        HTTPException: 403 if token is invalid
                      500 if token verification fails
    """
    cookies = request.cookies.get("jwt")
    if not cookies:
        return {"no token provided"}

    try:
        user = us.find(refresh_token=cookies)
        db.execute_query(user, params=(cookies,))
        user = db.fetch_one()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while finding user")

    if not user:
        raise HTTPException(status_code=403, detail="Access forbidden")

    user = {"email": user[3], "role": user[9]}
    try:
        payload = verify_token(cookies)
        if payload["email"] != user["email"]:
            return {"message": "invalid token"}
        access_token = sign_access_token({"email": user["email"], "role": user["role"]}, 'access')
        return {"accessToken": access_token}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while verifying token")

def verify_2fa(code: str, request: Request) -> JSONResponse:
    """
    Verify 2FA code and complete login process.
    
    Args:
        code (str): 2FA code to verify
        request (Request): FastAPI request object
        
    Returns:
        JSONResponse: Response with access token
        
    Raises:
        HTTPException: 400 if 2FA verification fails
    """
    temp_2fa_token = request.cookies.get("temp_2fa_token")
    if not temp_2fa_token:
        raise HTTPException(status_code=400, detail="2FA session expired or invalid.")
    
    try:
        payload = verify_token(temp_2fa_token)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or expired 2FA token.")
    
    if not verify_2fa_code(code):
        raise HTTPException(status_code=400, detail="Invalid 2FA code.")

    # Generate final tokens
    access_token = sign_access_token({"email": payload["email"], "role": "admin"}, "access")
    refresh_token = sign_access_token({"email": payload["email"], "role": "admin"}, "refresh")

    return JSONResponse(
        content={"accessToken": access_token},
        status_code=200,
        headers={"Set-Cookie": f"jwt={refresh_token}; HttpOnly; Max-Age=1800; SameSite=Lax"}
    )