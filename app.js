const express = require("express");
const app = express();
//------setup dependencies
require("dotenv").config();
//set up morgan
const morgan = require("morgan");
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
