const validator = require('../validator/validate');

exports.saveEvent = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    location: 'required|string',
    date: 'required|string',
    time: 'required|string',
    travelTime: 'string',
    repeat: 'string',
    invitees: 'string',
    showAs: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

exports.saveCalendar = (req, res, next) => {
  const validationRule = {
    events: 'required|string',
    owner: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};