from fastapi import Request, HTTPException , APIRouter,Depends
from app.models.appointment import Appointment
from app.controllers.appointments_controllers import get_all_appointments , get_apointment_by_id , get_patient_appointments , get_doctor_appointments , add_appointment , delete_appointment , update_appointment
from app.routes.user_routes import resolve_user

router = APIRouter()

@router.get("/all")
def get_all_appointments_route():
    return get_all_appointments()

@router.get("/patient" , dependencies=[Depends(resolve_user(allowed_roles=["patient"]))])
def get_patient_appointments_route(request: Request):
    patient_id = request.state.user
    return get_patient_appointments(patient_id)

@router.get("/doctor" , dependencies=[Depends(resolve_user(allowed_roles=["doctor"]))])
def get_doctor_appointments_route(request: Request):
    doctor_id = request.state.user
    return get_doctor_appointments(doctor_id)

@router.get("/{appointment_id}" , dependencies=[Depends(resolve_user(allowed_roles=["admin" , "doctor" , "patient"]))])
def get_apointment_by_id_route(request:Request,appointment_id: int):
    return get_apointment_by_id(request,appointment_id)


@router.post("/add" , dependencies=[Depends(resolve_user(allowed_roles=["doctor"]))])
def add_appointment_route(appointment : Appointment):
    return add_appointment(appointment)

@router.delete("/{appointment_id}" , dependencies=[Depends(resolve_user(allowed_roles=["doctor"]))])
def delete_appointment_route(request:Request,appointment_id: int):
    return delete_appointment(request,appointment_id)

@router.put("/{appointment_id}" , dependencies=[Depends(resolve_user(allowed_roles=["doctor"]))])
def update_appointment_route(request:Request,appointment_id: int, appointment : dict):
    return update_appointment(request, appointment_id, appointment)