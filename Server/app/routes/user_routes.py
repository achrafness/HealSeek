from fastapi import APIRouter , HTTPException , Request , UploadFile , File
from app.controllers.user_controllers import get_all_users as get_users ,update_user ,get_user_by_id as get_id , get_user_by_email as get_email,delete_user as delete , switch_2fa_status , add_admin,change_pfp
from fastapi import Depends
from app.middlewares.verify_jwt import verify_jwt



router = APIRouter()

def resolve_user(allowed_roles: list = None):
    def dependency(request: Request):
        return verify_jwt(request, allowed_roles=allowed_roles)
    return dependency


@router.get('/users' , dependencies= [Depends(resolve_user(allowed_roles=["admin"]))])#checked
def get_all_users():
    return get_users()


@router.get('/profile' , dependencies=[Depends(resolve_user(allowed_roles=["admin" , "patient" , "doctor"]))])#checked
def get_profile(request : Request):
    user_id = request.state.user
    return get_id(user_id)

@router.put('/update',dependencies=[Depends(resolve_user(allowed_roles=["admin" , "patient" , "doctor"]))])#checked
def update(request : Request, user_data:dict):
    user_id = request.state.user
    return update_user(user_id , user_data)

@router.get('/email/{email}', dependencies = [Depends(resolve_user(allowed_roles=["admin"]))])#checked
def get_user_by_email(email:str):
    return get_email(email)

@router.delete('/delete/{user_id}', dependencies=[Depends(resolve_user(allowed_roles=["admin"]))])#checked
def delete_user(user_id:int):
    return delete(user_id)

@router.put('/add_admin/{user_id}', dependencies=[Depends(resolve_user(allowed_roles=["admin"]))])#checked
def add_admin_route(user_id:int):
    return add_admin(user_id)






@router.put('/user/switch_2fa')
def switch_2fa(
    user: dict = Depends(resolve_user(allowed_roles=["admin"]))  # Resolves the user from the JWT
):
    return switch_2fa_status(email=user["email"])

@router.put('/user/change_pfp/{userid}')
def change_pfp_route(file :UploadFile , userid: int):
    return change_pfp(file , userid)

@router.get('/{user_id}')#checked
def get_user_by_id(user_id:int):
    return get_id(user_id)
