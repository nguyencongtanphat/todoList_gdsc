const express = require("express");
const app = express();
const userRoutes = require("./src/routes/UserRoute");
const siteRoutes = require("./src/routes/SiteRoute");
//------setup dependencies
require("dotenv").config();
//set up mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.Phat_CONNECT_DB)
  .then((result) => {
    console.log("connect successful");
  })
  .catch((err) => {
    console.log("connect failt", err);
  });
//set up morgan
const morgan = require("morgan");
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

app.use("/", siteRoutes);
app.use("/user", userRoutes);

module.exports = app;
