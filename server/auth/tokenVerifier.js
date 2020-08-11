const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ message: "access denied", success: false }).end();
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.jwt_token_pass);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "invalid token", success: false }).end();
    return;
  }
};
