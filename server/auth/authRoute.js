const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("./User");
const { registerValidation, loginValidation } = require("./validation");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  //validation
  try {
    await registerValidation(req.body);
  } catch (err) {
    res.json({ message: err.details[0].message, success: false }).end();
    return;
  }

  //checking duplication
  try {
    const isDuplicate = await userModel.findOne({ email: req.body.email });
    if (isDuplicate) {
      res.json({ message: "email already exists", success: false }).end();
      return;
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "data base error" }).end();
    return;
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //creating user
  const user = new userModel({
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    user.save();
    res
      .json({
        success: true,
        user,
      })
      .end();
    return;
  } catch (error) {
    res.status(500).json({ message: "failed to save", success: false }).end();
    return;
  }
});

router.post("/login", async (req, res) => {
  //validation
  try {
    await loginValidation(req.body);
  } catch (err) {
    res.json({ message: err.details[0].message, success: false }).end();
    return;
  }
  //checking if user exists
  try {
    const emailExists = await userModel.findOne({ email: req.body.email });
    if (!emailExists) {
      res.json({ message: "email doesn't exist", success: false }).end();
      return;
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "data base error" }).end();
    return;
  }
  try {
    var user = await userModel.findOne({ email: req.body.email });
  } catch (err) {
    res.status(500).json({ success: false, message: "db error" }).end();
    return;
  }
  try {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      res.json({ success: false, message: "invalid password" }).end();
      return;
    }
  } catch (err) {
    console.log("ERR : ", err);
    res.send({ message: "unknown error", success: false }).end();
    return;
  }

  const token = jwt.sign({ _id: user._id }, process.env.jwt_token_pass);

  res
    .header("auth-token", token)
    .json({ success: true, message: "loged in!", token })
    .end();
});

module.exports = router;
