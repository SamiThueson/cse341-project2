const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

exports.getCalendars =  async (req, res, next) => {
  const result = await mongodb.getDB().db().collection('calendars').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

exports.getOne = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection('calendars')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

