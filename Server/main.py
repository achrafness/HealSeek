from fastapi import APIRouter, FastAPI
import os
from app.database.database import db
from fastapi.middleware.cors import CORSMiddleware
""" from app.config.database import connect_db """
env = '../.env'
from app.routes.main_route import router
app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # await connect_to_mongo()
    db.connect()
    file_path = os.path.join(os.path.dirname(__file__), "text.sql")
    with open(file_path, "r") as file:
        text = file.read()
        db.execute_query(text)
    #connect_db()
    print("Starting up")
@app.on_event("shutdown")
async def shutdown():
    db.close()
    
    print("Shutting down")
    



""" api_router = APIRouter(
    prefix='/api',
    tags=["api"]
) """

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Hello World"}