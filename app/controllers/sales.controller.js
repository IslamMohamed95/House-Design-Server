const masterModel = require("../models/master.model");
const salesModel = require("../models/sales.model");

class sales {
  static new = async (req, res) => {
    try {
      let date = new Date();
      date = date.toLocaleString("en-US", {
        month: "short",
      });
      let histories = [
        {
          month: "Jan",
        },
        {
          month: "Feb",
        },
        {
          month: "Mar",
        },
        {
          month: "Apr",
        },
        {
          month: "May",
        },
        {
          month: "Jun",
        },
        {
          month: "Jul",
        },
        {
          month: "Aug",
        },
        {
          month: "Sep",
        },
        {
          month: "Oct",
        },
        {
          month: "Nov",
        },
        {
          month: "Dec",
        },
      ];
      const sale = new salesModel({
        ...req.body,
        annual_target: req.body.monthly_target * 12,
        monthly_target: req.body.monthly_target,
        history: histories,
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
      let monthly_target = [];
      let salesName = [];
      let salesAchievements = [];
      let salesman_monthly_target = [];
      const sales = await salesModel.find();
      sales.forEach((s) => {
        salesName.push(s.name);
        salesAchievements.push(s.annual_achieving);
        s.history.map((h, i) => {
          if (salesman_monthly_target.length <= 12) {
            salesman_monthly_target.push(h.achieved);
            if (salesman_monthly_target.length === 12) {
              monthly_target.push(salesman_monthly_target);
              salesman_monthly_target = [];
            }
          }
        });
        monthly_target.map((m) => {
          if (m.length < 13) {
            m.push(s.annual_target);
          }
        });
      });

      salesAchievements.push(req.master.annual_target);
      res.status(200).send({
        API: true,
        data: sales,
        sales: salesName,
        salesAchievements: salesAchievements,
        target: monthly_target,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static delete = async (req, res) => {
    try {
      await salesModel.findByIdAndDelete({ _id: req.params.id });
      const allSales = await salesModel.find();
      res.status(200).send({
        API: true,
        data: allSales,
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
