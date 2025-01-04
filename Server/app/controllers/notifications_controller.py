from fastapi import HTTPException , Request
from fastapi.responses import JSONResponse
from app.database.database import db , Notification as nt
from app.routes.websocket_endpoint import manager as connection_manager
from app.models.Notifications import Notification


async def send_notification(notification: Notification):
    notification = notification.dict()
    await connection_manager.send_notification(notification["user_id"], notification)
    try : 
        notification_querry=nt.insert(**notification)
        db.execute_query(notification_querry)
        return JSONResponse(content={"data" : notification}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_user_notifications(user_id:int):
    notifications_query = nt.find(user_id=user_id)
    db.execute_query(notifications_query ,params=(user_id,))
    notifications = db.fetch_all()
    notifications = [{"notification_id": notification[0] ,"content" : notification[1] ,"is_read" : notification[2] , "created_at" : notification[3].isoformat() , "user_id" : notification[4]} for notification in notifications]
    print(notifications)
    return JSONResponse(content=notifications, status_code=200)

def mark_as_read_inverse(notification_id:int):
    existing_notification = nt.find(notification_id=notification_id)
    db.execute_query(existing_notification, params=(notification_id,))
    existing_notification = db.fetch_one()
    if not existing_notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    read_status = existing_notification[2]
    notification_query = nt.update(is_read= not read_status, notification_id=notification_id)
    db.execute_query(notification_query, params=(not read_status,notification_id,))
    read = "unread" if existing_notification[2] else "read"
    return JSONResponse(content={"message": f"Notification marked as {read} ", "notification_id": notification_id}, status_code=200)

def mark_all_user_notifications_as_status(user_id : int , status : bool):
    existing_notifications = nt.find(user_id=user_id)
    db.execute_query(existing_notifications, params=(user_id,))
    existing_notifications = db.fetch_all()
    if not existing_notifications:
        raise HTTPException(status_code=404, detail="No notifications found")
    notification_query = nt.update(is_read= status, user_id=user_id)
    db.execute_query(notification_query, params=(status,user_id,))
    read = "read" if status else "unread"
    return JSONResponse(content={"message": f"All notifications marked as {read} ", "user_id": user_id}, status_code=200)

def delete_all_user_notifications(user_id:int):
    existing_notifications = nt.find(user_id=user_id)
    db.execute_query(existing_notifications, params=(user_id,))
    existing_notifications = db.fetch_all()
    if not existing_notifications:
        raise HTTPException(status_code=404, detail="No notifications found")
    notification_query = nt.delete(user_id=user_id)
    db.execute_query(notification_query, params=(user_id,))
    return JSONResponse(content={"message": "All notifications deleted", "user_id": user_id}, status_code=200)

