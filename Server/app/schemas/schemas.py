from app.models.user import User
from typing import Annotated

def user_serial(User: User) -> dict:
    return {
        
        'name': User.name,
        'email': User.email,
        'role': User.role,
        'password' : User.password
    }
    
def list_user_serial(users)->list:
    return [user_serial(user) for user in users]