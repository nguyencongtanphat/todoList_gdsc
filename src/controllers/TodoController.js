const item_model = require("../model/Todo");

const todoController = {
  // get all todo items
  get_all: async (req, res) => {
    try {
      const items = await item_model.find();
      res.json(items);
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  //get a todo item by id
  get_id: async (req, res, todo_id) => {
    try {
      const todo = await item_model.findById({ _id: req.params.todo_id });
      res.json(todo);
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  //post a todo item
  post: async (req, res) => {
    try {
      const todo = await new item_model({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      });
      todo.save().then((data) => {
        res.json(data);
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  //delete a todo item
  delete_todo: async (req, res, todo_id) => {
    try {
      const remove_todo = await item_model.remove({ _id: req.params.todo_id });
      res.json(remove_todo);
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  //update status of a todo item
  patch: async (req, res, todo_id) => {
    try {
      const update_todo = await item_model.updateOne(
        { _id: req.params.todo_id },
        { $set: { status: req.body.status } }
      );
      res.json(update_todo);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};

module.exports = todoController;
