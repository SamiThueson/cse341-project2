const express = require('express');
const router = express.Router();

const eventController = require('../controllers/events');
const validation = require('../middleware/validation');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.post('/', validation.saveEvent, eventController.createEvent);
router.put('/:id', validation.saveEvent,eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;