const router = require("express").Router();
const verify = require("../auth/tokenVerifier");


router.post("/image", verify, (req, res) => {
  res.json({ message: "i'm runing" });
});

module.exports = router;
