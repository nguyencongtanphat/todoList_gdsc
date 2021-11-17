const express = require("express");
const route = express.Router();
const userController = require("../controllers/UserController");

//[POST] /user/signup
route.post("/signup", userController.signup);

//[GET] user/login
route.get("/login", userController.login);
module.exports = route;
