import pytest
from app.database.database import db
from datetime import datetime

def test_database_connection():
    """
    Test if the database connection is established successfully.
    """
    try:
        # Attempt to connect to the database
        db.connect()
        
        # Assert that the connection and cursor are not None
        assert db.conn is not None, "Database connection failed (conn is None)"
        assert db.cursor is not None, "Database cursor failed (cursor is None)"
        
        print("Database connection established successfully.")
    except Exception as e:
        # Fail the test if an exception occurs
        pytest.fail(f"Database connection failed: {str(e)}")
    finally:
        # Close the connection after the test
        if db.conn:
            db.close()

def test_database_query_execution():
    """
    Test if a simple query can be executed against the database.
    """
    try:
        # Connect to the database
        db.connect()
        
        # Execute a simple query (e.g., fetch database version)
        db.cursor.execute("SELECT version();")
        result = db.fetch_one()
        
        # Assert that the result is not None
        assert result is not None, "Query execution failed (no result returned)"
        
        # Print the database version for debugging
        print(f"Database version: {result[0]}")
    except Exception as e:
        # Fail the test if an exception occurs
        pytest.fail(f"Query execution failed: {str(e)}")
    finally:
        # Close the connectioan after the test
        if db.conn:
            db.close()