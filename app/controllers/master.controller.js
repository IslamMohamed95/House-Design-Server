const masterModel = require("../models/master.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class master {
  static register = async (req, res) => {
    try {
      const exitingAdmin = await masterModel.find({ role: "Master" });
      if (!exitingAdmin) {
        var master = new masterModel({
          ...req.body,
        });
      } else {
        var master = new masterModel({
          ...req.body,
          total_contracts: exitingAdmin[0].total_contracts,
          completed_contracts: exitingAdmin[0].completed_contracts,
          pending_contracts: exitingAdmin[0].pending_contracts,
          canceled_contracts: exitingAdmin[0].canceled_contracts,
        });
      }
      await master.save();
      res.status(200).send({
        API: true,
        message: "Registration successfully",
      });
    } catch (e) {
      res.status(405).send({
        API: false,
        message: e.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const account = await masterModel.findOne({ email: req.body.email });
      if (!account) throw new Error("wrong email!..");
      const validate = await bcrypt.compare(
        req.body.password,
        account.password
      );
      if (!validate) throw new Error("wrong password!..");
      const token = jwt.sign({ _id: account._id }, "key");
      account.tokens.push({ token });
      await account.save();
      res.status(200).send({
        API: true,
        token: token,
        message: "Logged successfully",
      });
    } catch (e) {
      res.status(405).send({
        API: false,
        message: e.message,
      });
    }
  };

  static account = async (req, res) => {
    res.status(200).send(req.master);
    try {
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static reset = async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const account = await masterModel.findOneAndUpdate(
        {
          email: req.body.email,
        },
        {
          password: req.body.password,
        }
      );
      if (!account) throw new Error("Email is not exist!");
      account.save();
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

  static logout = async (req, res) => {
    try {
      req.master.tokens = req.master.tokens.filter((t) => {
        return t.token !== req.token;
      });
      await req.master.save();
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
}

module.exports = master;
