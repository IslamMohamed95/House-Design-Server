const masterModel = require("../models/master.model");
const salesModel = require("../models/sales.model");

class sales {
  static new = async (req, res) => {
    try {
      let date = new Date();
      const sale = new salesModel({
        ...req.body,
        annual_target: req.master.annual_target,
        monthly_target: req.body.monthly_target,
        history: [{ month: date.getMonth() + 1 }],
      });
      await sale.save();
      res.status(200).send({
        API: true,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static sales = async (req, res) => {
    try {
      let salesName = [];
      let salesAchievements = [];

      const sales = await salesModel.find();
      sales.map((s) => {
        salesName.push(s.name);
        salesAchievements.push(s.annual_achieving);
      });
      salesAchievements.push(req.master.annual_target);
      res.status(200).send({
        API: true,
        data: sales,
        sales: salesName,
        salesAchievements: salesAchievements,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };
}

module.exports = sales;
