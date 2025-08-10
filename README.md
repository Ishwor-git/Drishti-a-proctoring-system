# DRISHTI: A Proctoring System

## Overview
 DRISHTI is an online exam platform where proctors create and schedule exams by adding questions and selecting questions from a centralized bank, setting time limits, and enabling randomized question order to enhance exam integrity. Students (attendees) can take exams only during the scheduled time windows, answer questions through a simple interface, and receive instant grading. The system records their responses and exam session details for accurate tracking and review.. It streamlines exam management, user authentication, real-time monitoring, and automated violation detection to ensure fair and secure online assessments.


## Features

- **User Management**  
  Supports two user types: attendees (students) and proctors (invigilators). Secure registration and login with encrypted passwords. Role-based access control restricts functionalities accordingly.

- **Exam Management**  
  Proctors can create and schedule exams with details such as title, subject, duration, and availability window. Question order can be randomized to reduce cheating.

- **Question Bank**  
  Centralized repository for multiple-choice questions with four options each. Proctors can manage and reuse questions across multiple exams.

- **Exam Taking**  
  Attendees can start exams within allowed timeframes, answer questions, and receive instant scoring.


## Technology Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** FastAPI  
- **Authentication:** Argon2id hashing, JWT (JSON Web Token)  
- **Database:** PostgreSQL  
- **Hosting:** Render (cloud) and local development environment  
- **Version Control:** Git


## System Architecture

- Entities include Users (attendees, proctors), Exams, Questions, Exam Sessions, Answers, Logs (behavior events), and Violations.
- Exam sessions track time, answers, and violation logs.
- Proctors assign exams and monitor real-time integrity violations via an intuitive interface.


## Installation & Setup

*(Assuming typical full-stack app setup; adjust as needed)*

1. **Clone the repository**  
   ```bash
   git clone 
   cd drishti-proctoring-system
   ```

2. **Backend setup**  
   - Create and activate a Python virtual environment  
   - Install dependencies from `requirements.txt`  
   - Configure `.env` file with database and JWT secrets  
   - Run database migrations and seed initial data (questions, users)  
   - Start the FastAPI server  

3. **Frontend setup**  
   - Navigate to the frontend directory  
   - Install dependencies using npm or yarn  
   - Run the React development server  

4. **Access the app**  
   - Open the frontend URL in a browser  
   - Register as a user (attendee or proctor)  
   - Proctors can create exams and assign questions  
   - Attendees can take assigned exams within the time window


## Usage

- **Attendees:** Register/login → take assigned exams → answers are auto-graded → exam session logs are tracked  
- **Proctors:** Register/login → create/manage exams and questions → monitor live sessions → review violations


## Future Enhancements
- Monitoring and Behavior Tracking
- Violation Detection 
- Real-time webcam AI monitoring using OpenCV  
- Enhanced anomaly detection via machine learning models  
- Support for additional question types  
- Integration with LMS platforms  
- Mobile responsiveness and app version


## Contributors

- Ishwor Raj Pokhrel (THA079BEI013)  
- Pramit Khatri (THA079BEI020)  

