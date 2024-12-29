CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,
    refresh_token VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    date_of_birth DATE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(20),
    profile_picture_url VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('doctor', 'patient', 'admin')), 
    CONSTRAINT valid_email_format CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$')  
);

CREATE TABLE IF NOT EXISTS doctors (
    user_id INT PRIMARY KEY,
    speciality VARCHAR(100),
    experience INT CHECK (experience >= 0),
    max_appointments_in_day INT CHECK (max_appointments_in_day > 0),
    teleconsultation_available BOOLEAN DEFAULT FALSE,
    office_location VARCHAR(255),
    office_location_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS patients (
    user_id INT PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admins (
    user_id INT PRIMARY KEY,
    two_factor_auth_enabled BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id SERIAL PRIMARY KEY,
    appointment_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    doctor_id INT,
    patient_id INT,
    FOREIGN KEY (doctor_id) REFERENCES doctors(user_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ratings (
    rating_id SERIAL PRIMARY KEY,
    rating_score INT NOT NULL CHECK (rating_score BETWEEN 1 AND 5),
    review_text TEXT,
    doctor_id INT,
    patient_id INT,
    FOREIGN KEY (doctor_id) REFERENCES doctors(user_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS insurance_types (
    insurance_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS doctor_insurance (
    doctor_id INT,
    insurance_type_id INT,
    PRIMARY KEY (doctor_id, insurance_type_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(user_id) ON DELETE CASCADE,
    FOREIGN KEY (insurance_type_id) REFERENCES insurance_types(insurance_type_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS languages (
    language_id SERIAL PRIMARY KEY,
    language_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS doctor_languages (
    doctor_id INT,
    language_id INT,
    PRIMARY KEY (doctor_id, language_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(user_id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(language_id) ON DELETE CASCADE
);
