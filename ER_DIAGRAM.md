# Entity-Relationship (ER) Diagram
**Project: Doctor Booking Application**

This diagram represents the logical structure of the database, showing the tables and how they relate to one another.

```mermaid
erDiagram
    USER ||--o{ APPOINTMENT : "books"
    DOCTOR ||--o{ APPOINTMENT : "attends"

    USER {
        int id PK
        string name
        string email UK
        string password_hash
        string role
        timestamp created_at
    }

    DOCTOR {
        int id PK
        string name
        string specialty
        int experience
        text bio
        text education
        text clinic_address
        timestamp created_at
    }

    APPOINTMENT {
        int id PK
        int user_id FK
        int doctor_id FK
        date appointment_date
        time time
        string status
        timestamp created_at
    }
```

---

## Relationship Descriptions
1.  **Users to Appointments (1:N)**: A single user (patient) can book multiple appointments over time, but each appointment is linked to exactly one user.
2.  **Doctors to Appointments (1:N)**: A single doctor can have many appointments with different patients, but each appointment belongs to only one doctor.
3.  **Appointment Constraints**: 
    - The `user_id` must exist in the `users` table.
    - The `doctor_id` must exist in the `doctors` table.
    - This ensures data integrity and prevents "ghost" appointments.
