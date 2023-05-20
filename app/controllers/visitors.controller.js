const visitorModel = require("../models/visitors.model");

class visitor {
  static new = async (req, res) => {
    try {
      const currentDate = new Date();
      const fullDate = currentDate.toISOString().split("T")[0];
      const visitor = new visitorModel({
        ...req.body,
        assign_date: fullDate,
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

  static edit = async (req, res) => {
    try {
      const visitor = await visitorModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          Notes: req.body.Notes,
        }
      );
      visitor.save();
      const visitors = await visitorModel.find();
      res.status(200).send({
        API: true,
        data: visitors,
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
