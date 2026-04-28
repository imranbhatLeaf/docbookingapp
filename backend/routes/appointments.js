const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');
const router = express.Router();

// All routes require authentication
router.use(auth);

// Create an appointment
router.post('/', async (req, res) => {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date || !time) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Optional: check if slot is already taken (simple version)
        const conflict = await pool.query(
            'SELECT * FROM appointments WHERE doctor_id = $1 AND date = $2 AND time = $3',
            [doctorId, date, time]
        );
        if (conflict.rows.length > 0) {
            return res.status(409).json({ message: 'Time slot already booked' });
        }

        const result = await pool.query(
            `INSERT INTO appointments (patient_id, doctor_id, date, time, status)
             VALUES ($1, $2, $3, $4, 'confirmed')
             RETURNING *`,
            [patientId, doctorId, date, time]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get my appointments (as patient)
router.get('/my', async (req, res) => {
    const patientId = req.user.id;
    try {
        const result = await pool.query(
            `SELECT a.*, d.name as doctor_name, d.specialty 
             FROM appointments a
             JOIN doctors d ON a.doctor_id = d.id
             WHERE a.patient_id = $1
             ORDER BY a.date DESC, a.time DESC`,
            [patientId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Cancel an appointment (only if it's yours)
router.delete('/:id', async (req, res) => {
    const appointmentId = req.params.id;
    const patientId = req.user.id;

    try {
        const result = await pool.query(
            'DELETE FROM appointments WHERE id = $1 AND patient_id = $2 RETURNING *',
            [appointmentId, patientId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Appointment not found or not yours' });
        }
        res.json({ message: 'Cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;