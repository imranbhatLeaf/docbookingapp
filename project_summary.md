# Doctor Booking Application - Project Summary

This document summarizes the development and debugging of the Doctor Booking Application.

## 1. Project Architecture

The app is built as a Full-Stack JavaScript application:
- **Frontend**: React (Vite) + Tailwind CSS + Shadcn UI.
- **Backend**: Node.js + Express.
- **Database**: PostgreSQL with `pg` pool.
- **Authentication**: JWT (JSON Web Tokens) stored in `localStorage`.

## 2. Key Features Implemented

- **Doctor Browsing**: Users can see a list of doctors and filter by specialty.
- **Doctor Profiles**: Detailed view of each doctor's education, experience, and bio.
- **Appointment Booking**: Logged-in users can select a date and time to book an appointment.
- **Dashboard**: Users can view their upcoming appointments and cancel them.
- **Authentication System**: Login/Register pages with global state management via `AuthContext`.

## 3. Major Debugging & Fixes

### A. The "No Token Provided" Error
**Issue**: When the page refreshed, the user was automatically logged out, and booking attempts failed with "no token provided".
**Cause**: The frontend was trying to call `/api/auth/me` to validate the token on load. Since the endpoint didn't exist, it triggered a `logout()` which cleared the token.
**Fix**: 
- Implemented the `/api/auth/me` endpoint in the backend.
- Fixed the `login` function to correctly map user data from the response.

### B. The "Server Error" (Database Mismatch)
**Issue**: Booking an appointment caused a 500 Server Error.
**Cause**:
1. **Type Mismatch**: The backend used string IDs (`'mock-id'`) while the PostgreSQL database expected `integer`.
2. **Foreign Key Violation**: The `appointments` table required a `patient_id` that existed in the `users` table.
**Fix**:
- Updated mock IDs to integers (`1`).
- Seeded the database with a mock user (ID: 1) to satisfy foreign key constraints.

## 4. Current State (Prototype vs Production)

| Feature | Current State (Prototype) | Production Requirement |
| :--- | :--- | :--- |
| **Authentication** | Mocked (accepts any email/pass) | Implement real DB check + `bcrypt` hashing |
| **Database** | Seeded with sample doctors | Real doctor onboarding system |
| **Token Storage** | `localStorage` | Use HTTP-only cookies for better security |
| **Appointments** | Basic conflict check | Real-time slot availability logic |

## 5. How to Run
1. **Backend**: `cd backend && npm run dev` (Runs on port 5000)
2. **Frontend**: `cd frontend && npm run dev` (Runs on port 5173)
3. **Database**: Ensure PostgreSQL is running with the `docbooking` database.

---
*End of Summary*
