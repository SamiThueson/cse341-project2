const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

exports.getAll =  async (req, res) => {
  const result = await mongodb.getDB().db().collection('events').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

exports.getEvent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection('events')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

exports.createEvent = async (req, res) => {
  const newEvent = {
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    travelTime: req.body.travelTime,
    repeat: req.body.repeat,
    intitees: req.body.intitees,
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
    return res.status(500).json(result.error);
  }
};

exports.updateEvent = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const event = {
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    travelTime: req.body.travelTime,
    repeat: req.body.repeat,
    intitees: req.body.intitees,
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
    return res.status(500).json(result.error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection('events')
    .deleteOne({ _id: userId });
  if (result) {
    return res.status(200).send();
  } else {
    return res.status(500).json(result.error);
  }
};