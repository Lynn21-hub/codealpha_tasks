const express = require('express');
const applicationController = require('../Controllers/applicationController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/:jobId/apply', authMiddleware.authenticateToken, applicationController.applyForJob);
router.get('/my-applications', authMiddleware.authenticateToken, applicationController.listUserApplications);

module.exports = router;
