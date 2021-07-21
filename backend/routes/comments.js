const express = require("express");
const commentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/", auth, commentController.saveComment);
router.get("/", auth, commentController.showAllComment);
router.patch("/:id", auth, commentController.updateComment);
router.delete("/:id", auth, commentController.destroyComment);


module.exports = router;