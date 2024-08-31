const express = require('express');
const eventController = require('../Controllers/eventController');
const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/:id', eventController.getEventDetails);
router.get('/', eventController.listEvents);

module.exports = router;
