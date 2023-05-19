const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendars');

router.get('/', calendarController.getCalendar);

module.exports = router;