const variationModel = require("../models/variations.model");
const contractModel = require("../models/contract.model");
const fs = require("fs");
const path = require("path");

class variation {
  static new = async (req, res) => {
    try {
      const variation = new variationModel({
        contract_id: req.params.id,
        file: {
          name: req.file.originalname,
          path: fs.readFileSync("uploads/" + req.file.filename),
        },
      });
      await variation.save();
      let contract = await contractModel.findByIdAndUpdate(req.params.id, {
        variations: true,
      });
      res.status(200).send({
        API: true,
        variation: variation,
        Contract: contract,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static Variations = async (req, res) => {
    try {
      const variations = await variationModel.find();

      res.status(200).send({
        API: true,
        data: variations,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static contractVariations = async (req, res) => {
    try {
      const variations = await variationModel.find({
        contract_id: req.params.id,
      });

      res.status(200).send({
        API: true,
        contractVariations: variations,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static fileDownload = async (req, res) => {
    try {
      var file = await variationModel.findById(req.params.id);
      const filePath = file.file.path;
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Internal Server Error");
          return;
        }
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=file.pdf`);
        res.end(data);
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };
}

module.exports = variation;
