from fastapi import APIRouter, Depends, Request, Response
from app.middlewares.verify_jwt import verify_jwt
from app.models.models import User
from app.services import auth_service
from app.types.user_types import login_input , register_input

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

@router.post("/login")
def login(user_credentials: login_input,response:Response):
    return auth_service.login(user_credentials,response)
    
@router.post("/register")
async def register(user_credentials: register_input):
    return await auth_service.register(user_credentials)
    
@router.get("/logout")
def logout(response:Response,request:Request):
    return auth_service.logout(response,request)
    
@router.get("/refreshToken")
def refresh(response:Response,request:Request):
    return auth_service.handle_refresh_token(response,request)

@router.get('/me')
def get_my_user(response:Response,request:Request,user=Depends(verify_jwt())):
    return auth_service.get_my_user(response,request,user)