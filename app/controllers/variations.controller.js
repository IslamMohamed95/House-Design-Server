const variationModel = require("../models/variations.model");
const contractModel = require("../models/contract.model");
const fs = require("fs");

class variation {
  static new = async (req, res) => {
    try {
      console.timeLog(req.file.path);
      const variation = new variationModel({
        contract_id: req.params.id,
        file: {
          path: req.file.path,
          name: req.file.fieldname,
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
      console.log(file.file.path);
      const filePath = file.file.path;
      const stream = fs.createReadStream(filePath);
      res.set({
        "Content-Disposition": `attachment; filename='${file.file.name}'`,
        "Content-Type": "application/pdf",
      });
      stream.pipe(res);
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };
}

module.exports = variation;
