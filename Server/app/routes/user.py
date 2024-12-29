""" from fastapi import APIRouter , HTTPException
from app.models.user import User
from app.configuration.db import users_collection
from app.schemas.schemas import list_user_serial
from bson import ObjectId
from app.enums.roles import Roles

router = APIRouter()

@router.get('/')
def get_users():
    users = users_collection.find()
    return list_user_serial(users)

@router.post('/add')
def create_user(user : User):
    new_user = dict(user)
    print(new_user['role'])
    print(Roles.ADMIN.value)
    if new_user["role"] != Roles.USER.value:
        return HTTPException(status_code=400, detail="Cannot create a non-user type of user")   
    users_collection.insert_one(new_user)
    return user """