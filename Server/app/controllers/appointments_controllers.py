from fastapi import   HTTPException  , Request
from fastapi.responses import JSONResponse
from app.models.appointment import Appointment
from app.database.database import db , Appointment as ap , Doctor , Patient , User as us
from datetime import datetime

def get_all_appointments():
    try : 
        db.execute_query("SELECT * FROM appointments;")
        result = db.fetch_all()
        appointments_data = [{"appointment_id": appointment[0]  ,"appointment_time" : appointment[1].isoformat(),"status" : appointment[2] ,"doctor_id": appointment[3], "patient_id": appointment[4]} for appointment in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while fetching appointments : " + str(e))
    if not appointments_data:
        raise HTTPException(status_code=404, detail="No appointments found")
    return JSONResponse(content=appointments_data, status_code=200)

def get_apointment_by_id(request:Request,appointment_id: int):
    try:
        appointment_query = ap.find(appointment_id=appointment_id)
        db.execute_query(appointment_query, params=(appointment_id,))
        appointment = db.fetch_one()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while fetching appointment : " + str(e))
    if not appointment:
        raise HTTPException(status_code=404, detail="No appointment found")
    appointment_data = {"appointment_id": appointment[0] ,"appointment_time" : appointment[1].isoformat(),"status" : appointment[2] ,"doctor_id": appointment[3], "patient_id": appointment[4]}
    if request.state.user != appointment[3] or request.state.user != appointment[4]:
        raise HTTPException(status_code=403, detail="You are not allowed to see this appointment")
    return JSONResponse(content=appointment_data, status_code=200)

def get_patient_appointments(patient_id: int):
    try:
        patient_query = ap.find(patient_id=patient_id)
        db.execute_query(patient_query, params=(patient_id,))
        appointments_data = db.fetch_all()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while fetching appointments : " + str(e))
    if not appointments_data:
        raise HTTPException(status_code=404, detail="No appointments found")
    appointments_data = [{"appointment_id": appointment[0] ,"appointment_time" : appointment[1].isoformat(),"status" : appointment[2] ,"doctor_id": appointment[3], "patient_id": appointment[4]} for appointment in appointments_data]
    return JSONResponse(content=appointments_data, status_code=200)

def get_doctor_appointments(doctor_id : int):
    try:
        print("eee")
        doctor_query = ap.find(doctor_id=doctor_id)
        db.execute_query(doctor_query, params=(doctor_id,))
       
        print("eee")
        appointments_data = db.fetch_all()
        
        print("eee")
        print(appointments_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while fetching appointments : " + str(e))
    if not appointments_data:
        raise HTTPException(status_code=404, detail="No appointments found")
    appointments_data = [{"appointment_id": appointment[0] ,"appointment_time" : appointment[1].isoformat(),"status" : appointment[2] ,"doctor_id": appointment[3], "patient_id": appointment[4]} for appointment in appointments_data]
    return JSONResponse(content=appointments_data, status_code=200)

def add_appointment(appointment : Appointment):
    try:
        existing_doctor = Doctor.find(user_id=appointment.doctor_id)
        db.execute_query(existing_doctor, params=(appointment.doctor_id,))
        existing_doctor = db.fetch_one()
        if not existing_doctor:
            raise HTTPException(status_code=404, detail="Doctor ID is wrong")
        
        existing_patient = Patient.find(user_id=appointment.patient_id)
        db.execute_query(existing_patient, params=(appointment.patient_id,))
        existing_patient = db.fetch_one()
        if not existing_patient:
            raise HTTPException(status_code=404, detail="Patient ID is wrong")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while checking doctor or patient ID : " + str(e))
    try:
        if datetime.fromisoformat(appointment.appointment_time)< datetime.now():
            raise HTTPException(status_code=400, detail="Appointment time should be in future")
        appointment_query = ap.insert(**appointment.dict())
        db.execute_query(appointment_query)
        return JSONResponse(content=appointment.dict(), status_code=200)
    except Exception as e: 
        return HTTPException(status_code=500 , detail="error : "+str(e))

def update_appointment(request:Request,appointment_id: int, appointment_data: dict):
    try:
        appointment_query = ap.find(appointment_id=appointment_id)
        db.execute_query(appointment_query, params=(appointment_id,))
        appointment = db.fetch_one()
        if not appointment:
            raise HTTPException(status_code=404, detail="No appointment found")
        if request.state.user != appointment[3]:
            raise HTTPException(status_code=403, detail="You are not allowed to delete this appointment")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while fetching appointment : " + str(e))
    
    try:
        appointment_query = ap.update(**appointment_data, appointment_id=appointment_id)
        db.execute_query(appointment_query, params=(*[value for _, value in appointment_data.items()],appointment_id,))
        return JSONResponse(content=appointment_data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while updating appointment : " + str(e))
    
def delete_appointment(request:Request,appointment_id: int):
    try:
        appointment_query = ap.find(appointment_id=appointment_id)
        db.execute_query(appointment_query, params=(appointment_id,))
        appointment = db.fetch_one()
        if not appointment:
            raise HTTPException(status_code=404, detail="No appointment found")
        if request.state.user != appointment[3]:
            raise HTTPException(status_code=403, detail="You are not allowed to delete this appointment")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while fetching appointment : " + str(e))   
    try:
        appointment_query = ap.delete(appointment_id=appointment_id)
        db.execute_query(appointment_query, params=(appointment_id,))
        return JSONResponse(content={"message": "Appointment deleted"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while deleting appointment : " + str(e) )
    