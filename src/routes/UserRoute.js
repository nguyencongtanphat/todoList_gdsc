const express = require("express");
const route = express.Router();

route.get("/", (req, res, next) => {
  res.send("user");
});

route.post("/", () => {});

module.exports = route;
