const express = require("express");
const route = express.Router();
const todoController = require("../controllers/TodoController");

route.post("/", todoController.post);

module.exports = route;