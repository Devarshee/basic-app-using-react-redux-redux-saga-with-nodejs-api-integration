global.theMongoose = require("mongoose");

require("dotenv").config();

const { MONGODB_URL } = process.env;
console.log("mongo url", MONGODB_URL);

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

global.theMongoose.Promise = global.Promise;

handleErr = (res, err) => {
  try {
    res.myErr = err.toString();
  } catch (e) {
    res.myErr = "unknown err";
    console.log(err);
  }
  res.status(500).end(err.toString());
};

function start() {
  const userRouter = require("./routes/userRouter.js");
  const itemRouter = require("./routes/itemRouter.js");
  const orderRouter = require("./routes/orderRouter.js");

  var app = express();
  app.use(cors());

  app.use(bodyParser.json());

  app.use(userRouter);
  app.use(itemRouter);
  app.use(orderRouter);

  const port = process.env.PORT || 5000;
  app.listen(port, function(err) {
    if (err) return console.error(err);
    console.log("app running on port " + port);
  });
}

// global.theMongoose.set({ useCreateIndex: true });
global.theMongoose.connection
  .openUri(MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to %s", MONGODB_URL);
    start();
  })
  .catch(err => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
