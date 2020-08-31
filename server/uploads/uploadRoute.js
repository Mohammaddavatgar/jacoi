const router = require("express").Router();
const verify = require("../auth/tokenVerifier");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "../../upload/images",
  filename: (req, file, callBack) => {
    callBack(null, `${req.user.userName}-${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage: storage }).single("image");

router.post("/image", verify, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ success: false });
    } else {
      res.json({ success: true, image: req.file.image });
    }
  });
});

module.exports = router;
