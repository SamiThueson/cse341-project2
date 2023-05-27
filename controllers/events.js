const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

exports.getAllEvents =  async (req, res) => {
  const result = await mongodb.getDB().db().collection('events').find();
  result.toArray()
  .then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  })
  .catch((err) => {
    res.status(400).send({
      message: err.message || 'An error occurred while retrieving the events.'
    })
  });
};

exports.getEvent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Not a valid event ID! You have to use a valid event ID.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection('events')
    .find({ _id: userId });
  result.toArray()
  .then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
  .catch((err) => {
    res.status(400).send({
      message: err.message || 'An error occurred while retrieving an event.'
    })
  });
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = {
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      travelTime: req.body.travelTime,
      repeat: req.body.repeat,
      invitees: req.body.invitees,
      showAs: req.body.showAs
    };
    const result = await mongodb
      .getDB()
      .db()
      .collection('events')
      .insertOne(newEvent);
    if (result) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json(result.error|| 'An error occurred while creating the event.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Not a valid event ID! You have to use a valid event ID.');
    }
    const userId = new ObjectId(req.params.id);
    const event = {
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      travelTime: req.body.travelTime,
      repeat: req.body.repeat,
      invitees: req.body.invitees,
      showAs: req.body.showAs
    };
    const result = await mongodb
      .getDB()
      .db()
      .collection('events')
      .replaceOne({_id: userId}, event);
    if (result) {
      return res.status(204).send();
    } else {
      return res.status(500).json(result.error || 'An error occurred while updating the event.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Not a valid event ID! You have to use a valid event ID.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDB()
      .db()
      .collection('events')
      .deleteOne({ _id: userId });
    if (result) {
      return res.status(200).send();
    } else {
      return res.status(500).json(result.error || 'An error occurred while deleting the event.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};