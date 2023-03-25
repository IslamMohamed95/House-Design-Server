const variationModel = require("../models/variations.model");
const contractModel = require("../models/contract.model");

class variation {
  static new = async (req, res) => {
    try {
      const variation = new variationModel({
        contract_id: req.params.id,
        file: req.file,
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
      const file = await variationModel.findById(req.params.id);
      console.log(file.file);
      res.download(file.file.filename);
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };
}

module.exports = variation;
