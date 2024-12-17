const variationModel = require("../models/variations.model");
const contractModel = require("../models/contract.model");
const fs = require("fs");
const { s3Uploadv2 } = require("../../s3Service");
const { S3 } = require("aws-sdk");

class variation {
  static new = async (req, res) => {
    try {
      const result = await s3Uploadv2(req.file);

      const variation = new variationModel({
        contract_id: req.params.id,
        file: req.file.originalname,
      });
      await variation.save();
      let contract = await contractModel.findByIdAndUpdate(req.params.id, {
        variations: true,
      });
      res.status(200).send({
        API: true,
        variation: variation,
        Contract: contract,
        message: "Uploaded Successfully",
        result,
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

  static Download = async (req, res) => {
    try {
      const s3 = new S3();
      const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `upload/${req.params.name}`,
      };
      res.attachment(`upload/${req.params.name}`);
      s3.getObject(param).createReadStream().pipe(res);
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };
}

module.exports = variation;
