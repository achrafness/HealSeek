import pytest
from fastapi.testclient import TestClient
from main import app
from app.database.database import db

@pytest.fixture(scope="module")
def test_client():
    with TestClient(app) as client:
        yield client

@pytest.fixture(scope="module")
def setup_database():
    # Setup database connection
    db.connect()
    yield db
    # Teardown database connection
    db.close()