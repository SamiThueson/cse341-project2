const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

exports.getCalendars =  async (req, res, next) => {
  const result = await mongodb.getDB().db().collection('calendars').find();
  result.toArray()
  .then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  })
  .catch((err) => {
    res.status(400).send({
      message: err.message || 'An error occurred while retrieving the calendars.'
    })
  });
};

exports.getOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Not a valid calendar ID! You have to use a valid calendar ID.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection('calendars')
    .find({ _id: userId });
  result.toArray()
  .then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
  .catch((err) => {
    res.status(400).send({
      message: err.message || 'An error occurred while retrieving a calendar.'
    })
  });
};

