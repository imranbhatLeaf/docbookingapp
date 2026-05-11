const supabase = require('../db/supabase');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('Registration attempt for:', email);

  try {
    // Check if user exists
    const { data: userExists, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error('Check user existence error:', checkError);
      throw checkError;
    }
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into DB
    console.log('Inserting into users table...');
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        { name, email, password_hash: hashedPassword, role: role || 'patient' }
      ])
      .select('id, name, email, role')
      .maybeSingle(); // Use maybeSingle instead of single to be safer

    if (insertError) {
      console.error('Insert user error:', insertError);
      throw insertError;
    }
    
    console.log('User registered successfully:', email);
    res.status(201).json({
      ...newUser,
      token: generateToken(newUser.id),
    });
  } catch (error) {
    console.error('Registration Catch Error:', error);
    res.status(500).json({ message: error.message || error.details || 'Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from DB
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMe = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, getMe };
