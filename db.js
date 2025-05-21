require("dotenv").config();
const mongoose = require("mongoose");

//Difine the mongodb url

// const mongoURL = "mongodb://localhost:27017/hotels";

const mongoURL = process.env.MONGO_URL;


//setup mongodb connection

mongoose.connect(mongoURL);

//default connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connected successfully");
});
db.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
