const express = require('express');
const router = express.Router();
const eventController = require('../controllers/events');

router.get('/', eventController.getAll);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.createEvent);

module.exports = router;