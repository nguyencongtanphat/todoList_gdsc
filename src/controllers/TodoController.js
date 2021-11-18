const todo_Model = require("../model/Todo");
const user_Model = require("../model/User");
const ApiError = require("../middleWare/error/ApiError");

const todoController = {
    // get all todo items
    get_All: async (req, res, next) =>{
        try{
            const todos = await todo_Model.find({userId: req.body.userId});
            res.json(todos);
        }catch(err) { 
            next( ApiError.badRequest("User ID not found"));
        }
    },

    //get a todo item by id
    get_Id: async (req, res, todo_id) =>{
        try{
            const todo = await todo_Model.findById({_id: req.params.todo_id});
            if(todo.userId == req.body.userId)
                {res.json(todo);}
            else
            {
                next( ApiError.badRequest("You are not allowed"));
            }
        }catch{((err) => {
            res.json({message: err.message});
        })}
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
                else{
                    next( ApiError.badRequest("User ID not found"));
                }
            })
        }
        catch{((err) => {
            next({});
        })}
    },

    //delete a todo item
    delete_Todo: async (req, res, todo_id) =>{
        try{
            const todo = await todo_Model.findById({ _id: req.params.todo_id});
            if(user)   
            { 
                if(todo.userId == req.body.userId)
                {
                    const removed_Todo = await todo_Model.remove({ _id: req.params.todo_id });
                    res.json(removed_Todo);
                }
                else
                {
                    next( ApiError.badRequest("You are not allowed"));
                }
            }
        }catch(err){
            next({});
        }
    },
};

module.exports = todoController;
