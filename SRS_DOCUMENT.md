# Software Requirements Specification (SRS)
**Project: Doctor Booking Application**

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to provide a detailed overview of the software requirements for the Doctor Booking Application. This platform aims to bridge the gap between patients and medical professionals.

### 1.2 Scope
The system allows patients to register, search for doctors by specialty, view doctor profiles, and manage appointment bookings.

## 2. Overall Description
### 2.1 Product Perspective
This is a standalone web application utilizing a modern 3-tier architecture (React Client, Express Server, PostgreSQL Database).

### 2.2 User Classes and Characteristics
- **Patient**: Can search, book, and manage appointments.
- **Doctor**: (Future scope) Manage schedule and patient history.
- **Admin**: (Future scope) Manage doctor onboarding and system health.

## 3. System Features (Functional Requirements)

### 3.1 User Authentication
- The system shall allow users to login/register.
- The system shall use JWT for session persistence.

### 3.2 Doctor Discovery
- The system shall provide a list of available doctors.
- The system shall allow filtering by specialty (e.g., Cardiologist, Neurologist).

### 3.3 Appointment Management
- The system shall allow patients to select a specific date and time for a doctor.
- The system shall prevent double-booking of the same slot (Basic Conflict Check).
- The system shall allow patients to cancel appointments.

## 4. Non-Functional Requirements

### 4.1 Security
- All user passwords shall be hashed (Future).
- API routes requiring user identity shall be protected by a middleware layer.

### 4.2 Performance
- API response times for searching doctors shall be under 200ms.
- The frontend shall be optimized for fast initial load using Vite.

### 4.3 Usability
- The UI shall be responsive and work on Mobile, Tablet, and Desktop.
- Navigation shall be intuitive with clear success/error notifications (Sonner).

## 5. System Constraints
- Requires a stable internet connection.
- Requires a PostgreSQL instance for data storage.
- Requires a modern web browser (Chrome, Firefox, Safari).

---
*End of SRS*
