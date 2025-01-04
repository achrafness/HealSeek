from fastapi import APIRouter , HTTPException,Cookie , File , UploadFile
from app.models.user import Registration_input , Login_input
from app.controllers.auth_controllers import registeration , login as auth_login , logout as auth_logout , handle_refresh_token , verify_2fa
from app.utils.twoFA import generate_2fa_code , verify_2fa_code
from fastapi import Response , Request
router = APIRouter()


@router.post('/register')
async def register_user(User : Registration_input) : 
    response = await registeration(User)
    return response

@router.post("/login")
def login(user_credentials: Login_input,response:Response):
    response= auth_login(user_credentials,response)
    print(response)
    return response

@router.get("/logout")
def logout(response:Response , request:Request):
    response = auth_logout(response , request)
    print(response)
    return response

@router.get("/refresh")
def refresh_token(response : Response , request : Request):
    response = handle_refresh_token(response , request)
    return response



@router.post("/2fa")
def verify_2fa_code(code : str , request:Request): 
    return verify_2fa(code , request)