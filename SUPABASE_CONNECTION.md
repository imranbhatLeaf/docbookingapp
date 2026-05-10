# Supabase Connection Documentation

This document explains how Supabase is integrated into your Doctor Booking Application.

## 1. Environment Configuration
The connection details are stored in your backend `.env` file. These variables are loaded into the application using the `dotenv` package.

**File:** `backend/.env`
```env
SUPABASE_URL=https://tzketkrxaooubsirpfks.supabase.co
SUPABASE_ANON_KEY=sb_publishable_P76xaIMXt3iHJZBPSn2h8Q_nNw5lB62
```

---

## 2. Supabase Client Initialization
The application creates a singleton Supabase client that is used across all routes and controllers.

**File:** `backend/db/supabase.js`
```javascript
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
```

---

## 3. Usage in Routes (Fetching Data)
Routes import the initialized `supabase` client to perform database queries.

**File:** `backend/routes/doctors.js`
```javascript
const supabase = require('../db/supabase');

// Example: Fetching all doctors with filters
router.get('/', async (req, res) => {
    let query = supabase.from('doctors').select('*');
    
    if (req.query.specialty) {
        query = query.eq('specialty', req.query.specialty);
    }
    
    const { data, error } = await query;
    // ... handling response
});
```

---

## 4. Usage in Controllers (Writing Data)
Controllers use the client to insert or update data, such as registering a new user.

**File:** `backend/controllers/authController.js`
```javascript
const supabase = require('../db/supabase');

// Example: Inserting a new user
const { data: newUser, error: insertError } = await supabase
  .from('users')
  .insert([
    { 
      name, 
      email, 
      password_hash: hashedPassword, 
      role: 'patient' 
    }
  ])
  .select()
  .single();
```

---

## 5. Security (Row Level Security - RLS)
Supabase tables use RLS for security. For your local development, you may need to disable RLS or add policies in the Supabase Dashboard to allow the backend to perform actions using the `anon` key.

**SQL Command to Disable RLS (Run in Supabase SQL Editor):**
```sql
ALTER TABLE doctors DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
```
