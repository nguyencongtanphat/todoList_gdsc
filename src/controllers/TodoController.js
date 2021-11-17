const todo_Model = require("../model/Todo");
const user_Model = require("../model/User");

const todoController = {
    // get all todo items
    get_All: async (req, res) =>{
        try{
            const todos = await todo_Model.find({userId: req.body.userId});
            res.json(todos);
        }catch(err) {
            res.json({
                message: err.message
            });
        }
    },

    //get a todo item by id
    get_Id: async (req, res, todo_id) =>{
        try{
            const todo = await todo_Model.findById({_id: req.params.todo_id});
            if(todo.userId == req.body.userId)
                {res.json(todo);}
            else
                {res.json({message: "you are not allowed"});}
        }catch(err){
            res.json({message: err.message});
        }
    },

    //post a todo item
    post: (req, res) =>{
        try{
            user_Model.findById({_id: req.body.userId}).then((user)=>
            {
                if(user) {
                    const todo = new todo_Model(
                        {   title: req.body.title,
                            description: req.body.description,
                            userId: req.body.userId
                        });
                    todo.save()
                    .then( (data) => {res.json( data )});
                }
            })
        }
        catch(err){
            res.json({message: err.message});
        }
    },

    //delete a todo item
    delete_Todo: async (req, res, todo_id) =>{
        try{
            const todo = await todo_Model.findById({ _id: req.params.todo_id});
            if(todo.userId == req.body.userId)
            {
                const removed_Todo = await todo_Model.remove({ _id: req.params.todo_id });
                res.json(removed_Todo);
            }
            else
            {
                res.json({message: "you are not allowed"});
            }
        }catch(err){
            res.json({message: err.message});
        }
    },
};

module.exports = todoController;