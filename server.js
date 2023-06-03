const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config;
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 5500;
const host = process.env.HOST || 'localhost';

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDB((err, mongodb) => {
  if (err) {
    console.log('Cannot connect to the database!', err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${host}:${port}`);
  }
});