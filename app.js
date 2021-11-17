const express = require("express");
const app = express();
const userRoutes = require("./src/routes/UserRoute");
const siteRoutes = require("./src/routes/SiteRoute");
const todosRoutes = require("./src/routes/TodosRoute");
//------setup dependencies
//set up body parser
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

require("dotenv").config();
//set up mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.NK_DB_CONNECTION)
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
app.use("/todos", todosRoutes);

module.exports = app;
