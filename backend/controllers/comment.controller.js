const models = require("../models");
const user = require("../controllers/user.controller");

// save comment on db
function saveComment(req, res) {
  const comment = {
    userId: req.user.userId,
    contenu: req.body.contenu,
  };

  models.Comment.create(comment)
    .then((result) => {
      res.status(201).json({
        message: "comment created!",
        comment: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "cannot created",
        err: err,
      });
    });
}

// find all comment on db

function showAllComment(req, res) {
  models.Comment.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "cannot find!",
      });
    });
}

// update comment

function updateComment(req, res) {
  const id = req.params.id;
  const updateComment = {
    userId: req.user.userId,
    contenu: req.body.contenu,
    like: req.body.like,
  };

  models.Comment.update(updateComment, { where: { id: id } }).then((result) => {
    res
      .status(200)
      .json({
        message: "Comment Updated!",
        comment: updateComment,
      })
      .catch((err) => {
        res.status(500).json({
          message: "cannot update!",
          err: err,
        });
      });
  });
}

// delete comment

function destroyComment(req, res) {
  models.Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.userId === req.user.userId || req.user.role === "admin") {
        comment.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "comment deleted!" });
      } else {
        res.status(404).json({ message: "cannot deleted!" });
      }
    })
    .catch((error) => console.log(error));
}

module.exports = {
  saveComment: saveComment,
  showAllComment: showAllComment,
  updateComment: updateComment,
  destroyComment: destroyComment,
};
