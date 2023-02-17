const { json } = require("express");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
mongoose.set("strictQuery", true);
const USERS_DB = mongoose.createConnection(process.env.MONGODB_URI_USERS);
const DATA_DB = mongoose.createConnection(process.env.MONGODB_URI_DATA);

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
  },
  { timestamp: true }
);

const dataSchema = mongoose.Schema({
  brand: String,
  category: String,
  product: String,
  colour: String,
  price: Number,
  size: String,
  user: String,
  image: String,
});

const User = USERS_DB.model("User", userSchema);
const Data = DATA_DB.model("Data", dataSchema);

app.get("/data", (req, res) => {
  Data.find()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.send(err));
});

/* This is a way to set the port for the server. If the port is not set in the environment, it will
default to 3001. */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log("listening on port " + port);
});
