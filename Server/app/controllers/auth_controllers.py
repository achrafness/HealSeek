from email import message
from fastapi import HTTPException, Request, Response , Form , Response ,Cookie
from app.utils.auth import sign_access_token, verify_token
from typing import Annotated
from app.enums.roles import Roles
import bcrypt
from app.database.database import User as us , db , Doctor , Patient , Admin
from uuid import uuid4
import json
from app.models.user import Registration_input , Login_input
import jwt
from fastapi.responses import JSONResponse , RedirectResponse
from datetime import datetime
from app.utils.twoFA import generate_2fa_code , verify_2fa_code



async def registeration(User : Registration_input):
    user = dict(User)
    if not user['password'] : 
        HTTPException(400 , detail='a password is a must')
    elif not user['email']:
        HTTPException(400 , detail='an email is a must')
    elif not user['name']:
        HTTPException(400 , detail='a name is a must')
    user_query = us.find(email=user["email"])
    db.execute_query(user_query, params=(user["email"],))
    user_found = db.fetch_one()
    print(user_found)
    if user_found:
        raise HTTPException(400, detail='user already exists')
    #new_username = users_collection.find_one({"username" : username})
    #print(new_username)
    salt = bcrypt.gensalt(10)
    print(user["password"])
    user["password"] = bcrypt.hashpw(user['password'].encode('utf-8'), salt).decode('utf-8')
    userId = ''.join(filter(str.isdigit, str(uuid4())))
    userId = int(userId[:6])
    print(userId)
    try:
        usa = us.create(user_id = userId,Name=user['name'], Email=user["email"] , PhoneNumber=user["phone_number"]
                        , DateOfBirth=user["date_of_birth"], Password=user["password"],role=user["role"] , gender = user["gender"], profile_picture_url = user["pfpUrl"])
        db.execute_query(usa)
    except Exception as e:
        raise HTTPException(status_code=500, detail="error registering the user: " + str(e))
    if user['role'] == "doctor":
        try:
            print(user)
            doctor = Doctor.create(user_id = userId, speciality=user['speciality'], experience=user['experience'], max_appointments_in_day=user['max_appointments_in_day'], teleconsultation_available=user['teleconsultation_available'], office_location=user['office_location'], office_location_url=user['office_location_url'])
            db.execute_query(doctor)
        except Exception as e:
            raise HTTPException(status_code=500, detail="error registering the doctor: " + str(e))
    if user['role'] == "patient":
        try:
            patient = Patient.create(user_id = userId)
            db.execute_query(patient)
        except Exception as e:
            raise HTTPException(status_code=500, detail="error registering the patient: " + str(e))
    #temp
    if user['role'] == "admin":
        try:
            admin = Admin.create(user_id = userId, two_factor_auth_enabled=True ,last_login=datetime.now().isoformat())
            db.execute_query(admin)
        except Exception as e:
            raise HTTPException(status_code=500, detail="error registering the admin: " + str(e))
    return Response(content=json.dumps(user), media_type="application/json", status_code=201)



def login(userCredentials : Login_input,response:Response):
    userCredentials = dict(userCredentials)
    email = userCredentials["email"]
    password = userCredentials["password"]
    user_query = us.find(email=email)
    db.execute_query(user_query, params=(email,))
    user_found = db.fetch_one()
    if not user_found:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    print(user_found)
    user_found = {"password": user_found[6], "email": user_found[3], "role": user_found[9] , "user_id": user_found[0]}
    print(user_found)
    try:
        print(bcrypt.checkpw(password.encode('utf-8'), user_found["password"].encode('utf-8')))
        if not bcrypt.checkpw(password.encode('utf-8'), user_found["password"].encode('utf-8')): 
            raise HTTPException(status_code=400, detail="Invalid credentials")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = sign_access_token({"email": user_found["email"],"role": user_found["role"]},'access')
    refresh_token = sign_access_token({"email": user_found["email"],"role": user_found["role"]},'refresh')
    print(refresh_token)
    user_found['refresh_token'] = refresh_token
    logged_user_query = us.update(refresh_token=refresh_token , user_id = user_found["user_id"])
    db.execute_query(logged_user_query , params=(refresh_token, user_found["user_id"]))
    if user_found["role"] == "admin":
        found_admin = Admin.find(user_id=user_found["user_id"])
        db.execute_query(found_admin , params=(user_found["user_id"],))
        found_admin = db.fetch_one()
        
        if found_admin[1] == True:  # If 2FA is enabled
            # Generate and send 2FA code
            generate_2fa_code(receiver=user_found["email"])
            
            # Store a temporary session token (e.g., in Redis or an in-memory cache)
            temp_2fa_token = sign_access_token(
                {"email": user_found["email"], "user_id": user_found["user_id"]},
                "2fa",
            )

            return JSONResponse(
                content={"message": "2FA code sent to your email."},
                status_code=200,
                headers={
                    "Set-Cookie": f"temp_2fa_token={temp_2fa_token}; HttpOnly; Max-Age=300; SameSite=Lax"
                },
            )
        Admin_query = Admin.update(last_login=datetime.now().isoformat() , user_id=user_found["user_id"])   
        db.execute_query(Admin_query, params=(datetime.now().isoformat(), user_found["user_id"]))
    return JSONResponse(
        content={"accessToken": access_token},
        status_code=200,
        headers={
            "Set-Cookie": f"jwt={refresh_token}; HttpOnly; Max-Age=1800; SameSite=Lax"
        }
    )




def logout(response:Response,request:Request):
    cookies = request.cookies.get("jwt")
    if not cookies:
        return {"message": "Already logged out"}
    print("this is a cookie " , cookies)
    user = us.find(refresh_token=cookies)
    db.execute_query(user, params=(cookies,))
    user_data = db.fetch_one()
    
    print("user : " , user_data)
    if not user_data:
        response.delete_cookie('jwt')
        return {"message": "No active session found"}
    
    user = {"user_id": user_data[0], "name": user_data[1], "email": user_data[3], "role": user_data[9], "refresh_token": user_data[2]}
    logged_user_query = us.update(refresh_token="" , user_id = user["user_id"])
    db.execute_query(logged_user_query, params=("", user["user_id"]))
    response.delete_cookie('jwt')
    return {"message": "User has been logged out"}




def handle_refresh_token(response:Response,request:Request):
    
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
            print("payload : " ,payload)
            if payload["email"] != user["email"]:
                return {"message":"invalid token"}
            access_token = sign_access_token({"email": user["email"],"role": user["role"]},'access')
            return {"accessToken":access_token}
        except Exception as e:
            raise HTTPException(status_code=500, detail="Error while verifying token")


def verify_2fa(code: str , request:Request):
    temp_2fa_token = request.cookies.get("temp_2fa_token")
    print(temp_2fa_token)
    if not temp_2fa_token:
        print(temp_2fa_token)
        raise HTTPException(status_code=400, detail="2FA session expired or invalid.")
    
    # Decode temp_2fa_token
    try:
        print("hhhhh")
        payload = verify_token(temp_2fa_token)
        print(payload)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid or expired 2FA token.")
    
    # Verify the 2FA code
    if not verify_2fa_code(code):
        raise HTTPException(status_code=400, detail="Invalid 2FA code.")

    # Generate final access and refresh tokens
    access_token = sign_access_token({"email": payload["email"], "role": "admin"}, "access")
    refresh_token = sign_access_token({"email": payload["email"], "role": "admin"}, "refresh")

    return JSONResponse(
        content={"accessToken": access_token},
        status_code=200,
        headers={
            "Set-Cookie": f"jwt={refresh_token}; HttpOnly; Max-Age=1800; SameSite=Lax"
        },
    )
