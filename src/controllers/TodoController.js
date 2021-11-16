const item_model = require("../model/Todo");

const todoController = {
    post: async (req, res) =>{
        try{
            const todo = await new item_model(
                {   title: req.body.title,
                    description: req.body.description,
                    status: req.body.status
                });
            todo.save()
            .then( (data) => {res.json( data )});
        }catch(err){
            res.json({message: err.message});
        }
    }
};

module.exports = todoController;