const router = require("express").Router();
const verify = require("../auth/tokenVerifier");
const multer = require("multer");
const path = require("path");

const { imageTypeCheck, clipTypeCheck } = require("./typeCheck");

const imageStorage = multer.diskStorage({
  destination: `${__dirname}/../../upload/images/`,
  filename: (req, file, callBack) => {
    callBack(
      null,
      `${req.user.userName}-${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 313000 },
  fileFilter: imageTypeCheck,
}).single("image");

router.post("/image", verify, (req, res) => {
  imageUpload(req, res, (err) => {
    if (err) {
      res.status(500).json({ success: false, message: err });
    } else {
      res.json({ success: true, image: req.file.image });
    }
  });
});

const clipStorage = multer.diskStorage({
  destination: `${__dirname}/../../upload/videos/`,
  filename: (req, file, callBack) => {
    callBack(
      null,
      `${req.user.userName}-${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const clipUpload = multer({
  storage: clipStorage,
  // limits: { fileSize: 1000000 },
  fileFilter: clipTypeCheck,
}).single("clip");

router.post("/clip", verify, (req, res) => {
  clipUpload(req, res, (err) => {
    if (err) res.status(500).json({ success: false, message: err });
    else res.json({ success: true, image: req.file.image });
  });
});

module.exports = router;
