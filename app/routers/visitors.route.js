const route = require("express").Router();
const visitorController = require("../controllers/visitors.controller");

route.post("/new", visitorController.new);

module.exports = route;
