# Setup Guide: How to run this project on another laptop

Follow these steps to move and run the project on a new machine.

## 1. Prerequisites
Ensure the following are installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## 2. Clone the Repository
```bash
git clone https://github.com/imranbhatLeaf/docbookingapp.git
cd docbookingapp
```

## 3. Install Dependencies
You must run `npm install` in both the frontend and backend directories.

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

## 4. Database Configuration
1. Open your PostgreSQL client (pgAdmin or psql).
2. Create a new database named `docbooking`.
3. Open the `schema.sql` file located in the root of this project.
4. Copy the SQL and run it in your database's query tool to create the `users`, `doctors`, and `appointments` tables.

## 5. Environment Variables (.env)
Git ignores `.env` files for security. You must create them manually on the new machine.

### Backend (.env)
Create a file named `.env` inside the `backend` folder:
```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=docbooking
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432
JWT_SECRET=your_secret_key
```

### Frontend (.env)
Create a file named `.env` inside the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

## 6. Running the Application
Open two separate terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.
