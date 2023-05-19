const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let conn;

const initDB = (callback) => {
  if (conn) {
    console.log('Db is already initialized!');
    return callback(null, conn);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((c) => {
      conn = c;
      callback(null, conn);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDB = () => {
  if (!conn) {
    throw Error('DB not initialized');
  }
  return conn;
};

module.exports = { initDB, getDB };