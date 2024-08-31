const express = require('express');
const registrationController = require('../controllers/registrationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:eventId/register', authMiddleware.authenticateToken, registrationController.registerForEvent);
router.get('/my-registrations', authMiddleware.authenticateToken, registrationController.listUserRegistrations);

module.exports = router;
