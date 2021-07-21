const express = require("express");
const likeController = require("../controllers/like.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, likeController.saveLike);
// router.get("/", likeController.showAllLike);

module.exports = router;
