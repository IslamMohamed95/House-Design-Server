const route = require("express").Router();
const visitorController = require("../controllers/visitors.controller");
const auth = require("../middleware/authorization");

route.post("/new", visitorController.new);
route.post("/edit/:id", auth("Master"), visitorController.edit);
route.get("/visitors", auth("Master"), visitorController.visitors);

module.exports = route;
