const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

exports.getCalendar =  async (req, res, next) => {
  const result = await mongodb.getDB().db().collection('calendars').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};