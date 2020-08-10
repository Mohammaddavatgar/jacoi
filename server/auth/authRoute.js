const router = require("express").Router();
const Joi = require("joi");
const userModel = require("./User");

const userJoi = Joi.object({
  userName: Joi.string().min(4).max(255),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(7).required(),
});

router.post("/signup", async (req, res) => {
  console.log("BODY : ", req);
  const { error } = userJoi.validateAsync(req.body);

  if (error) {
    res.status(400).json({ error, success: false });
  } else {
    const user = new userModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      user.save();
      res.json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
});

module.exports = router;
