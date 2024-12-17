const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const contractModel = require("../models/contract.model");

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
        user: req.user,
        token: token,
        code: account.code,
        message: "Logged successfully",
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static profile = async (req, res) => {
    try {
      res.send(req.user);
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => {
        return t.token !== req.token;
      });
      await req.user.save();
      res.status(200).send({
        API: true,
        message: "Logged out successfully",
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

  static Pause = async (req, res) => {
    try {
      let now = new Date().toLocaleDateString("en-ca");
      var contract = await contractModel.findOne({ _id: req.params.id });
      contract.checkNote = true;
      contract.history.push({
        created_date: now,
        assign_date: contract.history.slice(-1)[0].assign_date,
        stage: contract.history.slice(-1)[0].stage,
        status: contract.history.slice(-1)[0].status,
        start_date: contract.history.slice(-1)[0].start_date,
        end_date: contract.history.slice(-1)[0].end_date,
        note: req.body.note,
        pauseStatus: true,
        editor: req.user.name,
        lastUpdate: now,
        seen: false,
      });
      await contract.save();
      res.status(200).send({
        API: true,
        data: contract,
      });
    } catch (e) {
      res.status(500).send({
        API: false,
        message: e.message,
      });
    }
  };

  static comment = async (req, res) => {
    try {
      let now = new Date().toLocaleDateString("en-ca");
      var contract = await contractModel.findOne({ _id: req.params.id });
      contract.checkNote = true;
      contract.history.push({
        created_date: now,
        assign_date: contract.history.slice(-1)[0].assign_date,
        stage: contract.history.slice(-1)[0].stage,
        status: contract.history.slice(-1)[0].status,
        start_date: contract.history.slice(-1)[0].start_date,
        end_date: contract.history.slice(-1)[0].end_date,
        note: req.body.note,
        pauseStatus: false,
        editor: req.user.name,
        lastUpdate: now,
        seen: false,
      });
      await contract.save();
      res.status(200).send({
        API: true,
        data: contract,
      });
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
      const account = await userModel.findOneAndUpdate(
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
}

module.exports = user;
