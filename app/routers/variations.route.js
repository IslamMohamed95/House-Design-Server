const route = require("express").Router();
const variationController = require("../controllers/variations.controller");
const upload = require("../middleware/upload");
const auth = require("../middleware/authorization");

route.post("/new/:id", upload.single("file"), variationController.new);

route.get("/download/:id", variationController.fileDownload);

route.get("/variations", variationController.Variations);
route.get("/contractVariations/:id", variationController.contractVariations);

module.exports = route;
