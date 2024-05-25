const route = require("express").Router();
const variationController = require("../controllers/variations.controller");

route.post("/new/:id", variationController.new);
route.get("/download/:name", variationController.Download);
route.get("/variations", variationController.Variations);
route.get("/contractVariations/:id", variationController.contractVariations);

module.exports = route;
