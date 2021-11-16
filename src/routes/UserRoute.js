const express = require("express");
const route = express.Router();
const userController = require("../controllers/UserController");

route.post("/signup", userController.signup);

module.exports = route;
