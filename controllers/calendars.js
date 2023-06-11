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

exports.createCalendar = async (req, res) => {
  try {
    const newCalendar = {
      events: req.body.events,
      owner: req.body.owner
    };
    const result = await mongodb
      .getDB()
      .db()
      .collection('calendars')
      .insertOne(newCalendar);
    if (result) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json(result.error|| 'An error occurred while creating the calendar.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCalendar = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Not a valid calendar ID! You have to use a valid calendar ID.');
    }
    const userId = new ObjectId(req.params.id);
    const calendars = {
      events: req.body.events,
      owner: req.body.owner
    };
    const result = await mongodb
      .getDB()
      .db()
      .collection('calendars')
      .replaceOne({_id: userId}, calendars);
    if (result) {
      return res.status(204).send();
    } else {
      return res.status(500).json(result.error || 'An error occurred while updating the calendar.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCalendar = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Not a valid calendar ID! You have to use a valid calendar ID.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDB()
      .db()
      .collection('calendars')
      .deleteOne({ _id: userId });
    if (result) {
      return res.status(200).send();
    } else {
      return res.status(500).json(result.error || 'An error occurred while deleting the calendar.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};