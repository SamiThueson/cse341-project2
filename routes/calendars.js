const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendars');
const validation = require('../middleware/validation');

router.get('/', calendarController.getCalendars);
router.get('/:id', calendarController.getOne);
router.post('/', validation.saveCalendar, calendarController.createCalendar);
router.put('/:id', validation.saveCalendar, calendarController.updateCalendar);
router.delete('/:id', calendarController.deleteCalendar);

module.exports = router;