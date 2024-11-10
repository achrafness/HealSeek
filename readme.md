# HealSeek

## Requirements
### Functional Requirements

1. **User Registration and Profile Management:**
   - **Doctors,  users (normal  and admin)** can register and log in to the platform.
   - Users can manage and update their profiles:
     - Doctors can update their **specialties, experience,isTeleconsultations,  languages spoken, accepted insurance type and Appointment max number **.
     - All users can update personal information and notification preferences.
   - Display doctor office locations on an interactive map for easy access.

2. **Doctor-Specific Profile and Appointment Management:**
   - Doctors can manage **appointments** with the following functionalities:
     - Add appointments for local users directly if needed.
   - Doctors can view the **status** of each appointment:
     - Options include **waiting, passed,** and **absent**.

3. **Appointment Booking and Notification System for Users:**
   - Users can book appointments through an **online booking system**.
   - Users receive notifications for:
     - A reminder notification **one hour before the appointment**.
   - The system provides appointment options for **in-person consultations** or **teleconsultations** if available.

4. **Advanced Search Functionality:**
   - Users can search for doctors based on various filters:
     - **Specialty, location, availability**, and **accepted insurance/mutual aid types**.
   - Search results display relevant doctor profiles with key information.

5. **Rating and Review System:**
   - Users can leave **ratings and reviews** for doctors based on their experiences.
   - Display average ratings and individual reviews on doctor profiles.
   - Option to report inappropriate or false reviews for moderation.

6. **Administrative Features:**
   - Admin users have access to:
     - **Platform statistics** (e.g., number of registered doctors, appointment counts).
     - **Blocking functionality**
      <!-- to restrict user access if necessary. -->

7. **Multilingual Support:**
   - The platform supports multiple languages, specifically **Arabic** and **French**, to enhance accessibility.
### Non-Functional Requirements

1. **Performance and Reliability:**
   - **Responsive design** for consistent experience across desktop and mobile.

2. **Scalability:**
   - Flexibility to add new features or extend the search criteria as needed.

3. **Security:**
   - Secure **authentication and role-based access control** for normal users, doctors, and admin.
   - Data encryption for sensitive information, especially appointment and personal data.
   - Compliance with **data protection regulations** for storing and processing medical information.

4. **Quality Assurance:**
   - **Unit Testing** for critical functionalities like registration, login, and appointment management.
   - **End-to-End (E2E) Testing** with Selenium for key workflows, such as search, booking, and reviews.
   - Testing tools:
     - **pytest** for backend unit tests.
     - **Jest** for frontend unit tests.
     - **Selenium** for E2E tests to simulate real user interactions.

6. **DevOps and Deployment:**
   - **CI/CD Pipeline** with GitHub Actions for automated testing, building, and deployment.
   - **Containerization** using Docker, with Docker Compose for simplified development and deployment.
   - Documentation of deployment process to enable smooth transition and maintenance.

7. **Project Management and Methodology:**
   - Agile **Scrum methodology** with two-week sprints, daily stand-ups, and bi-weekly role rotations.
   - Use **Trello** to manage backlog, sprint tasks, and track progress.
   - Role documentation to ensure seamless transitions during role rotations.


## analyse and conception
 
## use case
1. Use Case Analysis

We start by defining the main actors, their interactions with the system, and the primary use cases.
Actors

    Doctor: Registers, manages profile, and manages appointments.
    User (Patient): Registers, books appointments, and rates/reviews doctors.
    Admin: Manages users, views platform statistics, and blocks users.
    System: Sends notifications for appointment reminders.

Use Cases

    Registration and Login (Doctors, Users, Admins)
    Profile Management (Doctors, Users)
        Doctor Profile: Add/update specialties, experience, teleconsultation option, languages spoken, insurance type, and maximum appointment slots.
        User Profile: Update personal information, notification preferences.
    Search for Doctors (Users)
        Filter by specialty, location, availability, and insurance type.
    Appointment Management (Doctors and Users)
        Doctors: Add appointments for local users, view and update appointment status.
        Users: Book appointments, receive reminders.
    Rating and Reviews (Users)
    Notifications (System)
        Send a reminder one hour before the appointment.
    Administrative Features (Admins)
        View statistics, block/unblock users, manage inappropriate reviews.