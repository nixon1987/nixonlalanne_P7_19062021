const express= require('express');
const postsController = require ('../controllers/post.controller');
const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");
const router = express.Router();

router.post("/", auth, postsController.save);
router.get("/:id", auth, postsController.showOne);
router.get("/", postsController.showAll);
router.patch("/:id", auth, postsController.update);
router.delete("/:id", auth, postsController.destroyPost);

module.exports = router;