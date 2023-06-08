const MongoClient = require('mongodb').MongoClient;

const connectionURL = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL
const databaseName = 'your_database_name'; // Replace with your database name

let db; // Global variable to store the database connection

const connectDB = (callback) => {
  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to the database!');
    }

    console.log('Connected successfully to the database');
    db = client.db(databaseName);
    callback();
  });
};

const getDB = () => {
  return db;
};

module.exports = {
  connectDB,
  getDB
};