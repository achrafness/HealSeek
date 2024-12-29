import psycopg2
from psycopg2 import sql
from datetime import datetime
import inflection
import os
class Database:
    def __init__(self, host, port, dbname, user, password):
        self.host = host
        self.dbname = dbname
        self.port = port
        self.user = user
        self.password = password
        self.conn = None
        self.cursor = None

    def connect(self):
        print("Connecting to the DataBase.......")
        self.conn = psycopg2.connect(
            host=self.host,
            port=self.port,
            dbname=self.dbname,
            user=self.user,
            password=self.password
        )
        self.cursor = self.conn.cursor()
        self.cursor.execute("SELECT version()")
        db_version = self.fetch_one()
        print(f"Connection to the DataBase is successful: {db_version}") 

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()

    def execute_query(self, query, params=None):
        """ Execute a query with optional parameters """
        if self.cursor:
            self.cursor.execute(query, params)
            self.conn.commit()
        else:
            print("Error: Database connection or cursor is not available.")

    def fetch_one(self):
        return self.cursor.fetchone()

    def fetch_all(self):
        return self.cursor.fetchall()
class BaseModel:
    table_name = None

    @classmethod
    def create_table(cls):
        if not cls.table_name:
            raise ValueError(f"Table name for {cls.__name__} not defined")
        
        columns = cls.__annotations__  # Using Python type annotations as columns
        columns_def = ", ".join([f"{column} {dtype}" for column, dtype in columns.items()])

        query = f"CREATE TABLE IF NOT EXISTS {cls.table_name} ({columns_def});"
        return query

    @classmethod
    def insert(cls, **kwargs):
        kwargs = {inflection.underscore(k): v for k, v in kwargs.items()}
        keys = kwargs.keys()
        values = kwargs.values()
        query = sql.SQL("INSERT INTO {table} ({fields}) VALUES ({values})").format(
            table=sql.Identifier(cls.table_name),
            fields=sql.SQL(',').join(map(sql.Identifier, keys)),
            values=sql.SQL(',').join(map(sql.Literal, values))
        )
        return query

    @classmethod
    def select(cls, **kwargs):
        query = f"SELECT * FROM {cls.table_name} WHERE "
        condition = " AND ".join([f"{key} = %s" for key in kwargs.keys()])
        query += condition
        return query

    @classmethod
    def update(cls, **kwargs):
        query = f"UPDATE {cls.table_name} SET "
        set_clause = ", ".join([f"{key} = %s" for key in list(kwargs.keys())[:-1]])
        query += set_clause 
        last_item = list(kwargs.keys())[-1]
        query += f" WHERE {last_item} = %s"
        return query 

    @classmethod
    def delete(cls, **kwargs):
        query = f"DELETE FROM {cls.table_name} WHERE "
        condition = " AND ".join([f"{key} = %s" for key in kwargs.keys()])
        query += condition
        return query
    # display the attributes of the class
    def __repr__(self):
        return f"{self.__class__.__name__}({self.__dict__})"
class User(BaseModel):
    table_name = "users"
    user_id: int
    name: str
    email: str
    phone_number: str
    date_of_birth: str
    password: str
    gender: str
    profile_picture_url: str
    role: str
    refresh_token: str

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class Doctor(BaseModel):
    table_name = "doctors"
    user_id: int
    speciality: str
    experience: int
    max_appointments_in_day: int
    teleconsultation_available: bool
    office_location: str
    office_location_url: str

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class Patient(BaseModel):
    table_name = "patients"
    user_id: int

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class Admin(BaseModel):
    table_name = "admins"
    user_id: int
    two_factor_auth_enabled: bool
    last_login: datetime

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class Notification(BaseModel):
    table_name = "notifications"
    notification_id: int
    content: str
    is_read: bool
    created_at: datetime
    user_id: int

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class Appointment(BaseModel):
    table_name = "appointments"
    appointment_id: int
    appointment_time: datetime
    status: str
    doctor_id: int
    patient_id: int

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class Rating(BaseModel):
    table_name = "ratings"
    rating_id: int
    rating_score: int
    review_text: str
    doctor_id: int
    patient_id: int

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class InsuranceType(BaseModel):
    table_name = "insurance_types"
    insurance_type_id: int
    type_name: str

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class DoctorInsurance(BaseModel):
    table_name = "doctor_insurance"
    doctor_id: int
    insurance_type_id: int

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class DoctorLanguage(BaseModel):
    table_name = "doctor_languages"
    doctor_id: int
    language_id: int

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query
class Language(BaseModel):
    table_name = "languages"
    language_id: int
    language_name: str

    @classmethod
    def create(cls, **kwargs):
        query = cls.insert(**kwargs)
        return query

    @classmethod
    def find(cls, **kwargs):
        query = cls.select(**kwargs)
        return query

db = Database('localhost', '5432' ,'Test2', 'postgres', 'majd2020')

""" file_path = os.path.join(os.path.dirname(__file__), "text.sql") """
""" with open(file_path, "r") as file:
    text = file.read()
    db.execute_query(text)
    # fetch names of all tables
    # db.execute_query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    # tables = db.fetch_all()
    # print(f"Tables in the database: {tables}")
user = User.create(UserId=3, Name="John Doe", Email="asassd@gmail.com" , PhoneNumber="132367890", DateOfBirth="1990-01-01", Password="asasa",role='doctor')
db.execute_query(user)
# attrbute of object user 
print(f"user in object form: {user}")
db.execute_query("SELECT * FROM users;")
user = db.fetch_all()
print(f"Users in the database: {user}")
db.close() """