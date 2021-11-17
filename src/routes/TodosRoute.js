const express = require("express");
const route = express.Router();
const todoController = require("../controllers/TodoController");

//get all todolist: GET
route.get("/", todoController.get_All);

//get a todo item by id: GET
route.get("/:todo_id", todoController.get_Id);

//post a todo item: POST
route.post("/", todoController.post);

//delete a todo item: DELETE
route.delete("/:todo_id", todoController.delete_Todo);

module.exports = route;