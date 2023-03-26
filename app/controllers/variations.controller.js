const variationModel = require("../models/variations.model");
const contractModel = require("../models/contract.model");

class variation {
  static new = async (req, res) => {
    try {
      const variation = new variationModel({
        contract_id: req.params.id,
        file: "uploads/" + req.master._id + "/" + req.file.filename,
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
        message: "bad",
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
      const file = await variationModel.findById(req.params.id);
      fs.readFile(file.file, (err, data) => {
        res.contentType("application/pdf");
        res.send(data);
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
