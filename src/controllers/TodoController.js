const todo_Model = require("../model/Todo");
const user_Model = require("../model/User");
const ApiError = require("../middleWare/error/ApiError");
const notAllowedNotification =
  "You are not allowed, you need to login or signup";

const todoController = {
  // get all todo items
  get_All: async (req, res, next) => {
    try {
      if (req.body.userId) {
        const todos = await todo_Model.find({ userId: req.body.userId });
        if (todos.length > 0) {
          res.json({
            yourTodos: todos.length,
            todos: todos,
          });
        } else {
          res.json({
            message: "You do not have any todo yet. Let make some note here",
          });
        }
      } else {
        next(ApiError.badRequest(notAllowedNotification));
      }
    } catch (err) {
      next({});
    }
  },

  //get a todo item by id
  get_Id: async (req, res, next) => {
    try {
      if (req.body.userId) {
        const todo = await todo_Model.findById({ _id: req.params.todo_id });
        if (todo.userId == req.body.userId) {
          res.json(todo);
        } else {
          next(ApiError.badRequest(notAllowedNotification));
        }
      } else {
        next(ApiError.badRequest(notAllowedNotification));
      }
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  },

  //post a todo item
  post: (req, res, next) => {
    try {
      user_Model.findById({ _id: req.body.userId }).then((user) => {
        if (user) {
          const todo = new todo_Model({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId,
          });
          todo
            .save()
            .then((data) => {
              res.json({ message: "you posted successfully", data });
            })
            .catch((err) => {
              next({});
            });
        } else {
          next(ApiError.badRequest("User not found"));
        }
      });
    } catch {
      (err) => {
        next({});
      };
    }
  },

  //delete a todo item
  delete_Todo: async (req, res, todo_id) => {
    try {
      if (req.body.userId) {
        const todo = await todo_Model.findById({ _id: req.params.todo_id });
        if (todo.userId == req.body.userId) {
          const removed_Todo = await todo_Model.remove({
            _id: req.params.todo_id,
          });
          res.json({
            message: "you have removed successfully " + removed_Todo,
          });
        } else {
          next(ApiError.badRequest(notAllowedNotification));
        }
      }
    } catch (err) {
      next({});
    }
  },
};

module.exports = todoController;
