const route = require("express").Router();
const variationController = require("../controllers/variations.controller");
const upload = require("../middleware/upload");
const auth = require("../middleware/authorization");

route.post(
  "/new",
  auth("Master"),
  upload.single("file"),
  variationController.new
);

route.get("/download/:id", auth("Master"), variationController.fileDownload);

route.get("/variations", auth("Master"), variationController.Variations);
route.get(
  "/contractVariations/:id",
  auth("Master"),
  variationController.contractVariations
);

module.exports = route;
