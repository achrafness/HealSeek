from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.controllers.user_controllers import (
    get_all_users as get_users,
    update_user,
    get_user_by_id as get_id,
    get_user_by_email as get_email,
    delete_user as delete,
    switch_2fa_status,
    add_admin,
    change_pfp,
)
from app.middlewares.verify_jwt import verify_jwt , verify_jwt_temp

router = APIRouter()
security = HTTPBearer()
def resolve_user(allowed_roles: list = None):
    def dependency(request: Request):
        return verify_jwt(request, allowed_roles=allowed_roles)
    return dependency

def resolve_user_temp(allowed_roles: list = None):
    async def dependency(credentials: HTTPAuthorizationCredentials = Depends(security)):
        # Extract the token from the credentials
        access_token = credentials.credentials

        # Verify the token and check roles using verify_jwt
        user = verify_jwt_temp(access_token, allowed_roles=allowed_roles)
        return user
    return dependency
# Routes

@router.get('/users', description="Fetch all users. Admin access only.", response_description="Returns a list of all users.")
def get_all_users(current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin"]))):
    return get_users()

@router.get('/profile', description="Fetch the profile of the current user.", response_description="Returns the user's profile data.")
def get_profile(current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin", "patient", "doctor"]))):
    user_id = current_user["user_id"]
    return get_id(user_id)

@router.put('/update', description="Update user details.", response_description="Returns the updated user data.")
def update_user_route(user_data: dict, current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin", "patient", "doctor"]))):
    user_id = current_user["user_id"]
    return update_user(user_id, user_data)

@router.get('/email/{email}', description="Fetch user details by email. Admin access only.", response_description="Returns the user data.")
def get_user_by_email_route(email: str, current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin"]))):
    return get_email(email)

@router.delete('/delete/{user_id}', description="Delete a user by their ID. Admin access only.", response_description="Returns a message indicating the deletion status.")
def delete_user_route(user_id: int, current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin"]))):
    return delete(user_id)

@router.put('/add_admin/{user_id}', description="Promote a user to admin.", response_description="Returns a message indicating the promotion status.")
def add_admin_route(user_id: int, current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin"]))):
    return add_admin(user_id)

@router.put('/user/switch_2fa', description="Toggle 2FA status for the current user.", response_description="Returns a message indicating the 2FA status change.")
def switch_2fa_route(current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin", "patient", "doctor"]))):
    return switch_2fa_status(user_email=current_user["email"])

@router.put('/user/change_pfp/{userid}', description="Change profile picture for a specific user.", response_description="Returns a message indicating the profile picture change status.")
def change_pfp_route(file: UploadFile, userid: int, current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin", "patient", "doctor"]))):
    return change_pfp(file, userid)

@router.get('/{user_id}', description="Fetch user details by user ID.", response_description="Returns the user data.")
def get_user_by_id_route(user_id: int, current_user: dict = Depends(resolve_user_temp(allowed_roles=["admin", "patient", "doctor"]))):
    return get_id(user_id)