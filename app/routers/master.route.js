const route = require("express").Router();
const auth = require("../middleware/authorization");
const masterController = require("../controllers/master.controller");

route.post("/register", masterController.register);
route.post("/login", masterController.login);
route.post("/reset", auth("Master"), masterController.reset);
route.post("/logout", auth("Master"), masterController.logout);

route.get("/account", auth("Master"), masterController.account);

module.exports = route;
