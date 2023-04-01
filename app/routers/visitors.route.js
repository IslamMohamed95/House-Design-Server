const route = require("express").Router();
const visitorController = require("../controllers/visitors.controller");
const auth = require("../middleware/authorization");

route.post("/new", visitorController.new);
route.get("/visitors", auth("Master"), visitorController.visitors);

module.exports = route;
