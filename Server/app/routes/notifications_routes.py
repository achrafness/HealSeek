from fastapi import APIRouter , HTTPException , Request , Depends
from app.controllers.notifications_controller import send_notification , get_user_notifications , mark_as_read_inverse , mark_all_user_notifications_as_status , delete_all_user_notifications
from app.routes.user_routes import resolve_user_temp
from app.models.Notifications import Notification

router = APIRouter()

@router.post("/send_notification/")
async def send_notification_route(notification: Notification):
    return await send_notification(notification)

@router.get("/get_user_notifications/" , dependencies=[Depends(resolve_user_temp(allowed_roles=["admin" , "patien" , "doctor"]))])
def get_user_notifications_route(request: Request):
    user_id = request.state.user
    return get_user_notifications(user_id)

@router.get("/mark_as_read_inverse/{notification_id}")
def mark_as_read_inverse_route(notification_id:int):
    return mark_as_read_inverse(notification_id)

@router.get("/mark_all_user_notifications_as_status/{status}" , dependencies=[Depends(resolve_user_temp(allowed_roles=["admin" , "patien" , "doctor"]))])
def mark_all_user_notifications_as_status_route(request:Request,status : bool):
    user_id = request.state.user
    return mark_all_user_notifications_as_status(user_id , status)

@router.delete("/delete_all_user_notifications" , dependencies=[Depends(resolve_user_temp(allowed_roles=["admin" , "patien" , "doctor"]))])
def delete_all_user_notifications_route(request:Request):
    user_id = request.state.user
    return delete_all_user_notifications(user_id)

#you forgot to add the route to delete a single and mutiple notifications
