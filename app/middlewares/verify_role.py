

from fastapi import HTTPException, Request, Response

from app.models.models import RoleEnum
def verify_role(user, allowed_roles):
    if isinstance(allowed_roles, RoleEnum):
        allowed_roles = [allowed_roles]
    elif isinstance(allowed_roles, str):
        allowed_roles = [RoleEnum[allowed_roles]]

    user_roles = [role.name for role in user.roles]
    
    if not any(role in user_roles for role in allowed_roles):
        raise HTTPException(status_code=403, detail="Access Forbidden")
    
    return user