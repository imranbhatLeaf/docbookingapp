const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all doctors (with optional filters)
router.get('/', async (req, res) => {
    const { search, specialty } = req.query;
    let query = 'SELECT * FROM doctors WHERE 1=1';
    const params = [];

    if (search) {
        params.push(`%${search}%`);
        query += ` AND name ILIKE $${params.length}`;
    }
    if (specialty && specialty !== 'all') {
        params.push(specialty);
        query += ` AND specialty = $${params.length}`;
    }

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single doctor by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Doctor not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;