from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Prescription(BaseModel):
    prescription_id: Optional[int]  
    appointment_id: int
    doctor_id: int
    patient_id: int
    diagnosis: str
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class PrescriptionMedication(BaseModel):
    medication_id: Optional[int]
    prescription_id: int
    medication_name: str
    dosage: str
    frequency: str
    duration: str
    instructions: Optional[str] = None