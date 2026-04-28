const pool = require('../db/pool');

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    // Scaffold: Insert appointment into DB
    // const appointment = await pool.query(
    //   'INSERT INTO appointments (user_id, doctor_id, date, time) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [req.user.id, doctorId, date, time]
    // );
    // res.status(201).json(appointment.rows[0]);

    // For now, return mock success
    res.status(201).json({ id: 'mock-appt-id', doctorId, date, time, status: 'booked' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    // Scaffold: Fetch appointments for the logged-in user
    // const appointments = await pool.query('SELECT * FROM appointments WHERE user_id = $1', [req.user.id]);
    // res.json(appointments.rows);

    // For now, return mock empty array
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { bookAppointment, getMyAppointments };
