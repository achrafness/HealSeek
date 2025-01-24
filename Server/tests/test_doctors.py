import pytest
from fastapi import status
from fastapi.testclient import TestClient
from main import app
from app.database.database import db
import jwt
from datetime import datetime, timedelta
from app.config import settings
from unittest.mock import patch
from app.middlewares.verify_jwt import verify_jwt_temp

@pytest.fixture(scope="module")
def test_client():
    with TestClient(app) as client:
        yield client

@pytest.fixture(scope="module")
def setup_database():
    # Setup database connection
    db.connect()
    # Insert test data
    db.execute_query("""
        INSERT INTO users (user_id, name, email, phone_number, date_of_birth, password, gender, profile_picture_url, role)
        VALUES (1, 'Dr. John Doe', 'john.doe@example.com', '1234567890', '1980-01-01', 'password', 'Male', 'url', 'doctor');
    """)
    db.execute_query("""
        INSERT INTO doctors (user_id, speciality, experience, max_appointments_in_day, appointment_duration_minutes, teleconsultation_available, office_location, office_location_url)
        VALUES (1, 'Cardiology', 10, 20, 30, TRUE, 'New York', 'https://maps.example.com/newyork');
    """)
    yield
    # Clean up test data
    db.execute_query("DELETE FROM doctors WHERE user_id = 1;")
    db.execute_query("DELETE FROM users WHERE user_id = 1;")
    db.close()

def generate_test_token(user_id: int, role: str):
    payload = {
        "sub": str(user_id),  # Ensure this matches what verify_jwt_temp expects
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
    }
    secret_key = settings.JWT_PRIVATE_KEY  # Use the same key as in your application
    token = jwt.encode(payload, secret_key, algorithm="HS256")  # Ensure the algorithm matches
    return token

@pytest.fixture(scope="module")
def mock_verify_jwt():
    def mock_verify_jwt_temp(token, allowed_roles=None):
        return {"user_id": 1, "role": "doctor"}  # Simulate a valid user
    with patch("app.middlewares.verify_jwt.verify_jwt_temp", mock_verify_jwt_temp):
        yield

@pytest.mark.usefixtures("test_client", "setup_database", "mock_verify_jwt")
class TestDoctors:
    def test_get_all_doctors(self, test_client):
        response = test_client.get("/doctors")
        assert response.status_code == status.HTTP_200_OK
        assert "doctors" in response.json()
        assert isinstance(response.json()["doctors"], list)

    def test_get_doctor_by_id(self, test_client):
        doctor_id = 1
        response = test_client.get(f"/doctors/{doctor_id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["user_id"] == doctor_id

    def test_get_doctor_by_id_not_found(self, test_client):
        doctor_id = 999
        response = test_client.get(f"/doctors/{doctor_id}")
        assert response.status_code == status.HTTP_404_NOT_FOUND


    def test_search_doctors(self, test_client):
        response = test_client.get("/doctors/search", params={"speciality": "Cardiology"})
        assert response.status_code == status.HTTP_200_OK
        assert "doctors" in response.json()
        assert isinstance(response.json()["doctors"], list)