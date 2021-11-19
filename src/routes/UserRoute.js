const express = require("express");
const route = express.Router();
const userController = require("../controllers/UserController");
const authController = require("../middleWare/authen");

//[POST] /user/signup
route.post("/signup", userController.signup);

//[GET] user/login
route.get("/login", userController.login);

//[GET] user/logout
route.get("/logout", authController, userController.logout);
module.exports = route;
