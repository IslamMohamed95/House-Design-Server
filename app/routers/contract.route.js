const route = require("express").Router();
const auth = require("../middleware/authorization");
const contractController = require("../controllers/contract.controller");

route.post("/new/:code", auth("Master"), contractController.new);
route.post("/delete/:id", auth("Master"), contractController.delete);
route.post("/edit/:id", auth("Master", "User"), contractController.edit);
route.post("/seen/:id", contractController.seen);

route.get("/contracts", auth("Master"), contractController.contracts);
route.get("/userContracts/:code", contractController.userContracts);
route.get("/notes/:id", auth("Master"), contractController.clientNotes);
route.get("/sendContract/:id", contractController.sendContract);

module.exports = route;
