from jwt import PyJWTError as JWTError
from fastapi import Request, Response, HTTPException, Depends
from app.database import User
from app.utils.auth import verify_token
from app.models.models import RoleEnum

def verify_jwt(allowed_roles="user"):
    async def dependency(request: Request,allowed_roles=allowed_roles):
        try:
            # Extract and verify JWT token
            access_token = request.headers.get("Authorization") or request.headers.get("authorization")
            if not access_token:
                raise HTTPException(status_code=401, detail="Unauthenticated")
            if not access_token.startswith("Bearer"):
                raise HTTPException(status_code=401, detail="Unauthenticated")
            access_token = access_token.split(' ')[1]
            payload = verify_token(access_token)
            if not payload:
                raise HTTPException(status_code=401, detail="Unauthenticated")
            
            # Retrieve user from database
            username = payload["sub"]
            user = User.find_one({"username": username})
            if not user:
                raise HTTPException(status_code=401, detail="Unauthenticated")
            
            # Verify user's role
            if allowed_roles:
                if isinstance(allowed_roles, RoleEnum):
                    allowed_roles = [allowed_roles]
                elif isinstance(allowed_roles, str):
                    allowed_roles = [allowed_roles]
                
                user_roles = user["role"]
                if isinstance(user_roles, str):
                    user_roles = [user_roles]
                if not any(role in user_roles for role in allowed_roles):
                    raise HTTPException(status_code=403, detail="Forbidden: Insufficient role")
            return user
        except JWTError:
            raise HTTPException(status_code=401, detail="Unauthenticated")
        except Exception as e:
            raise HTTPException(status_code=500, detail={"message": "Internal Server Error", "exception": str(e)})
    
    return dependency
