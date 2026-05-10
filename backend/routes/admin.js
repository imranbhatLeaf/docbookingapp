const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { getPendingApplications, updateApplicationStatus } = require('../controllers/adminController');

// All admin routes must pass auth AND isAdmin middleware
router.use(auth, isAdmin);

router.get('/applications', getPendingApplications);
router.put('/applications/:id', updateApplicationStatus);

module.exports = router;
