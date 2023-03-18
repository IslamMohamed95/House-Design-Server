const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class user {
  static register = async (req, res) => {
    try {
      if (req.master.role === "Master") {
        var code = "";
        let date = new Date();
        date =
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();
        for (var i = 0; i < 5; i++) {
          code = code.concat(parseInt(Math.random() * 10));
        }
        var user = new userModel({
          ...req.body,
          code: code,
          joining_date: date,
        });
        await user.save();
        res.status(200).send({
          API: true,
          message: "Registration successfully",
        });
      }
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const account = await userModel.findOne({ email: req.body.email });
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
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static users = async (req, res) => {
    try {
      const users = await userModel.find();

      res.status(200).send({
        API: true,
        users: users,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static findUser = async (req, res) => {
    try {
      const user = await userModel.find({ code: req.params.code });

      res.status(200).send({
        API: true,
        user: user[0],
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };
}

module.exports = user;
