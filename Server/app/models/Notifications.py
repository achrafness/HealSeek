from pydantic import BaseModel
import datetime

class Notification(BaseModel):
    content: str
    is_read: bool = False
    created_at: str
    user_id: int