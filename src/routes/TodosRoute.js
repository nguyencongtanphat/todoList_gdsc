const express = require("express");
const app = express();
const route = express.Router();
const item = require("../model/Todo");
const bodyParser = require("body-parser");


route.get("/", (req, res, next) => {
  res.send("todos");
});

route.post('/', (req, res) =>
{
    try{
        const todo = new item(
            {   title: req.body.title,
                description:req.body.description,
                done: req.body.done
            });
        todo.save()
        .then(data => {res.json(data)} );
    }catch(err){
        res.json({message: "error"});
    }
});


module.exports = route;