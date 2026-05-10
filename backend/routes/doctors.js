const express = require('express');
const { getDoctors, getDoctorById, applyForDoctor, getMyDoctorProfile } = require('../controllers/doctorController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getDoctors);

// Protected route for getting own profile
router.get('/me', auth, getMyDoctorProfile);

// Dynamic routes should be last
router.get('/:id', getDoctorById);

// Protected route for applying as a doctor
router.post('/apply', auth, applyForDoctor);

module.exports = router;
