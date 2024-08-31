const express = require('express');
const jobController = require('../controllers/jobController');
const router = express.Router();

router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobDetails);
router.get('/', jobController.listJobs);

module.exports = router;
