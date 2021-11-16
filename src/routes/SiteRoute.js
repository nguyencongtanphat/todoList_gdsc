const express = require("express");
const route = express.Router();
const siteController = require("../controllers/SiteController.js");

//[GET] /
route.get("/", siteController.getHome);

module.exports = route;
