const pool = require('../db/pool');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Scaffold: Validate user data and check if user exists
    // const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    // if (userExists.rows.length > 0) return res.status(400).json({ message: 'User already exists' });

    // Scaffold: Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Scaffold: Insert into DB
    // const newUser = await pool.query(
    //   'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    //   [name, email, hashedPassword, role || 'patient']
    // );
    
    // For now, return mock success
    res.status(201).json({
      id: 1,
      name,
      email,
      role: role || 'patient',
      token: generateToken(1),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Scaffold: Fetch user from DB
    // const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    // if (user.rows.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    // Scaffold: Compare passwords
    // const isMatch = await bcrypt.compare(password, user.rows[0].password);
    // if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // For now, return mock success
    res.json({
      id: 1,
      name: 'Mock User',
      email,
      role: 'patient',
      token: generateToken(1),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMe = async (req, res) => {
  try {
    // In a real app, you'd fetch the user from the DB using req.user.id
    // For now, return mock user data
    res.json({
      id: req.user.id,
      name: 'Mock User',
      email: 'mock@example.com',
      role: 'patient',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, getMe };
