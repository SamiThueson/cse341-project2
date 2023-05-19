const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendars');

router.get('/', calendarController.getCalendars);
router.get('/:id', calendarController.getOne);

module.exports = router;