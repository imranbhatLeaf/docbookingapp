const pool = require('../db/pool');

const getDoctors = async (req, res) => {
  try {
    // Scaffold: Fetch doctors from DB
    // const doctors = await pool.query('SELECT id, name, specialty, location, availability FROM doctors');
    // res.json(doctors.rows);
    
    // For now, return mock empty array
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getDoctorById = async (req, res) => {
  try {
    // Scaffold: Fetch a single doctor by ID
    // const doctor = await pool.query('SELECT * FROM doctors WHERE id = $1', [req.params.id]);
    // if (doctor.rows.length === 0) return res.status(404).json({ message: 'Doctor not found' });
    // res.json(doctor.rows[0]);

    // For now, return mock empty object
    res.json({ id: req.params.id, name: 'Mock Doctor' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDoctors, getDoctorById };
