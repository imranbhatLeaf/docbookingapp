# Technical Documentation: Doctor Booking Application
**College Project Submission Report**

---

## 1. Project Overview
The **Doctor Booking Application** is a full-stack web platform that allows patients to find doctors by specialty, view their professional profiles, and book appointments. The system focuses on real-time data persistence, secure authentication, and a responsive user interface.

## 2. Technology Stack
- **Frontend**: React.js (Vite), Tailwind CSS (Styling), Shadcn UI (Components).
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL (Relational Database).
- **Authentication**: JSON Web Tokens (JWT).
- **API Client**: Axios with Interceptors.

---

## 3. Database Schema (PostgreSQL)
We used a relational database to ensure data integrity through Foreign Key constraints.

- **`users` Table**: Stores patient credentials and roles.
- **`doctors` Table**: Stores professional details (specialty, experience, clinic address).
- **`appointments` Table**: Links patients and doctors with specific dates and times.
  - *Constraint*: `patient_id` references `users(id)`.
  - *Constraint*: `doctor_id` references `doctors(id)`.

---

## 4. Backend Structure (The "Engine")

### 📂 `index.js`
The entry point of the server. It initializes Express, connects middleware (CORS, JSON parser), and mounts all API routes.

### 📂 `db/pool.js`
Manages the connection pool to PostgreSQL. Using a "Pool" instead of a single connection improves performance by reusing database connections.

### 📂 `middleware/`
- **`auth.js`**: A security guard. It intercepts requests to protected routes, checks the `Authorization` header for a JWT, and decodes it to identify the user.
- **`errorHandler.js`**: Standardizes error responses (404 for not found, 500 for server errors) so the frontend always receives a consistent JSON format.

### 📂 `controllers/`
This is where the "Business Logic" lives.
- **`authController.js`**: Handles Login, Registration, and the `getMe` validation.
- **`appointmentController.js`**: Logic for creating, fetching, and cancelling bookings.

### 📂 `routes/`
Defines the URL endpoints (e.g., `/api/appointments`) and connects them to the appropriate controller functions.

---

## 5. Frontend Structure (The "Interface")

### 📂 `src/context/AuthContext.jsx`
Uses the **React Context API** to manage the user's login state globally. This prevents "Prop Drilling" and allows the Navbar to change dynamically (Login -> Logout) based on the user's status.

### 📂 `src/services/api.js`
A centralized Axios instance. It includes a **Request Interceptor** that automatically attaches the JWT token from `localStorage` to every outgoing request, ensuring the user stays authenticated.

### 📂 `src/pages/`
- **`Home.jsx`**: The landing page with the Hero section.
- **`DoctorsList.jsx`**: Features filtering logic to find doctors by specialty.
- **`BookingPage.jsx`**: The interface for selecting time slots.
- **`Dashboard.jsx`**: Personal area for users to manage their history.

---

## 6. Step-by-Step Development Log (The "Process")

### Step 1: Foundation
Initialized the Node.js server and React frontend. Set up the PostgreSQL tables using `schema.sql`.

### Step 2: Authentication Fix
**Problem**: Users were logged out on page refresh.
**Solution**: Implemented a `/me` endpoint and fixed the frontend `useEffect` to validate the token on mount.

### Step 3: Database Integration Fix
**Problem**: Booking was failing with "Server Error".
**Solution**: Discovered a data type mismatch (String vs Integer) and a Foreign Key violation. Fixed by updating mock IDs to integers and seeding a default user in the DB.

### Step 4: Security & Deployment
Configured `.gitignore` to protect sensitive `.env` files and deployed the entire codebase to GitHub.

---

## 7. Future Enhancements
1. **Real Payment Gateway**: Integrate Stripe/Razorpay for consultation fees.
2. **Video Consultation**: Add WebRTC for remote doctor-patient calls.
3. **Admin Panel**: For hospital staff to verify doctor credentials.

---
**Prepared by**: [Imran Bhat/]
**Date**: April 2026
