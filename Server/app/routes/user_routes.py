from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Depends
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
from app.middlewares.verify_jwt import verify_jwt

router = APIRouter()

# Dependency for resolving user roles and permissions
def resolve_user(allowed_roles: list = None):
    def dependency(request: Request):
        return verify_jwt(request, allowed_roles=allowed_roles)
    return dependency

# Routes

@router.get('/users', dependencies=[Depends(resolve_user(allowed_roles=["admin"]))])
def get_all_users():
    """Fetch all users. Admin access only."""
    return get_users()

@router.get('/profile', dependencies=[Depends(resolve_user(allowed_roles=["admin", "patient", "doctor"]))])
def get_profile(request: Request):
    """Fetch the profile of the current user."""
    user_id = request.state.user
    return get_id(user_id)

@router.put('/update', dependencies=[Depends(resolve_user(allowed_roles=["admin", "patient", "doctor"]))])
def update_user_route(request: Request, user_data: dict):
    """Update user details."""
    user_id = request.state.user
    return update_user(user_id, user_data)

@router.get('/email/{email}', dependencies=[Depends(resolve_user(allowed_roles=["admin"]))])
def get_user_by_email_route(email: str):
    """Fetch user details by email. Admin access only."""
    return get_email(email)

@router.delete('/delete/{user_id}', dependencies=[Depends(resolve_user(allowed_roles=["admin"]))])
def delete_user_route(user_id: int):
    """Delete a user by their ID. Admin access only."""
    return delete(user_id)

@router.put('/add_admin/{user_id}', dependencies=[Depends(resolve_user(allowed_roles=["admin"]))])
def add_admin_route(user_id: int):
    """Promote a user to admin."""
    return add_admin(user_id)

@router.put('/user/switch_2fa', dependencies=[Depends(resolve_user(allowed_roles=["admin", "patient", "doctor"]))])
def switch_2fa_route(request: Request):
    """Toggle 2FA status for the current user."""
    user = request.state.user
    return switch_2fa_status(user_email=user["email"])

@router.put('/user/change_pfp/{userid}', dependencies=[Depends(resolve_user(allowed_roles=["admin", "patient", "doctor"]))])
def change_pfp_route(file: UploadFile, userid: int):
    """Change profile picture for a specific user."""
    return change_pfp(file, userid)

@router.get('/{user_id}', dependencies=[Depends(resolve_user(allowed_roles=["admin", "patient", "doctor"]))])
def get_user_by_id_route(user_id: int):
    """Fetch user details by user ID."""
    return get_id(user_id)
