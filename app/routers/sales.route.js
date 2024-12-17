const route = require("express").Router();
const auth = require("../middleware/authorization");
const salesController = require("../controllers/sales.controller");

route.post("/new", auth("Master"), salesController.new);
route.post("/delete/:id", auth("Master"), salesController.delete);
route.get("/all", auth("Master"), salesController.sales);

module.exports = route;
