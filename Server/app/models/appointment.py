from pydantic import BaseModel
from app.enums.status import status

class Appointment(BaseModel):
    appointment_time: str
    status: str
    doctor_id: int
    patient_id: int