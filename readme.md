# HealSeek

## Requirements
### Functional Requirements

1. **User Registration**  
   - The platform enables registration and login for **Doctors**, **Regular Users**, and **Admins**.  

2. **Profile Management**  
   - Users can update and manage their profiles:  
     - **Doctors** can edit their specialties, years of experience, teleconsultation availability, languages spoken, accepted insurance types, and the maximum number of daily appointments.  
     - **All users** can modify their personal information.  
   - Doctor office locations are displayed on an interactive map for ease of access.  

3. **Appointments**  
   - **For Users (Booking):**  
     - Users can book appointments using an **online booking system**.  
     - Notifications are sent to users, including a **reminder one hour before the appointment**.  
     - Appointment options include **in-person consultations** or **teleconsultations**, if available.  
   - **For Doctors (Management):**  
     - Doctors can add appointments directly for local users when needed.  
     - Doctors can view and manage the **status** of appointments, categorized as **waiting**, **completed**, or **no-show**.  
     

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
 
