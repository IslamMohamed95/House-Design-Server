const route = require("express").Router();
const variationController = require("../controllers/variations.controller");
const upload = require("../middleware/upload");

route.post("/new/:id", upload.single("file"), variationController.new);
route.get("/download/:name", variationController.Download);
route.get("/variations", variationController.Variations);
route.get("/contractVariations/:id", variationController.contractVariations);

module.exports = route;
