const path = require("path");
module.exports = {
  imageTypeCheck: (req, file, callBack) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );

    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
      callBack(null, true);
    } else {
      callBack("invalid entry");
    }
  },
  clipTypeCheck: (req, file, callBack) => {
    const types = /mp4|mkv/;

    const extCheck = types.test(path.extname(file.originalname));

    const mimeCheck = types.test(file.mimetype);
    if (extCheck && mimeCheck) {
      callBack(null, true);
    } else {
      callBack("invalid entry");
    }
  },
};
