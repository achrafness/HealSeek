from fastapi import APIRouter, FastAPI
from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.routes.doctor import router as doctor_router
from app.routes.admin import router as admin_router
from app.routes.appointment import router as appointment_router
from app.routes.prescription import router as prescription_router
 
# from app.database import close_mongo_connection, connect_to_mongo

app = FastAPI()

@app.on_event("startup")
async def startup():
    # await connect_to_mongo()
    print("Starting up")
@app.on_event("shutdown")
async def shutdown():
    # await close_mongo_connection()
    print("Shutting down")



api_router = APIRouter(
    prefix='/api',
    tags=["api"]
)


api_router.include_router(auth_router)
api_router.include_router(user_router)
api_router.include_router(doctor_router)
api_router.include_router(admin_router)
api_router.include_router(appointment_router)
api_router.include_router(prescription_router)

app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}