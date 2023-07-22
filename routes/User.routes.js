// routes are controller only . MVC Model
const express = require("express");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, name, age, pass: hash });
      await user.save();
      res.status(200).send({ msg: "New user has been registered" });
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ authorID: user._id,
            author:user.name }, "masai");
          // backend is a random payload . used to encode the token
          // masai is the secret key which is used to decode the token
          res.status(200).send({ msg: "Login Successful", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!!!" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials!!!" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
