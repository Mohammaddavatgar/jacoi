const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require("./User");
const { registerValidation } = require("./validation");

router.post("/signup", async (req, res) => {
  //validation
  try {
    await registerValidation(req.body);
  } catch (err) {
    res.json({ message: err.details[0].message, success: false });
  }

  //checking duplication
  try {
    const isDuplicate = await userModel.findOne({ email: req.body.email });
    if (isDuplicate)
      res.json({ message: "email already exists", success: false });
  } catch (err) {
    res.status(500).json({ success: false, message: "data base error" });
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
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "failed to save", success: false });
  }
});

module.exports = router;
