const item = require("Todo.js");
const moogoose = require('mongoose');
const todolist = moongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        items: {
            type: item
        }
    }
)