const express = require("express");
const postsController = require("../controllers/post.controller");
const auth = require("../middleware/auth");
const imageUploader = require("../helpers/image-uploader");
const router = express.Router();

router.post(
  "/",
  auth,
  imageUploader.upload.single("image"),
  postsController.save
);
router.get("/:id", auth, postsController.showOne);
router.get("/", postsController.showAll);
router.patch("/:id", auth, postsController.update);
router.delete("/:id", auth, postsController.destroyPost);

module.exports = router;
