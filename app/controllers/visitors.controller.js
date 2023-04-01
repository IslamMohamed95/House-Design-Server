const visitorModel = require("../models/visitors.model");

class visitor {
  static new = async (req, res) => {
    try {
      const visitor = new visitorModel({
        ...req.body,
      });
      await visitor.save();
      res.status(200).send({
        API: true,
        message: "Welcome",
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static visitors = async (req, res) => {
    try {
      var visitors = await visitorModel.find();
      res.status(200).send({
        API: true,
        visitors,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };
}

module.exports = visitor;
