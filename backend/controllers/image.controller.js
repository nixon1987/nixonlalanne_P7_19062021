const models = require("../models");
const user = require("../controllers/post.controller")

function upload(req, res) {
  if (req.file.filename) {
    image = {
      userId: user.id,
      image: req.file.filename,
    };
    models.Image.create(image);
    res.status(201).json({
      message: "Image Upload successfully",
      url: req.file.filename,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  upload: upload,
};
