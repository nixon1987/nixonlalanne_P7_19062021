const models = require("../models");


// save on db
function save(req, res) {
  const post = {
    titre: req.body.titre,
    contenu: req.body.contenu,
    imageUrl: req.body.image_Url,
    categorie: req.body.categorie,
    userId: req.user.userId,
  };
  

  models.Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: "post created!",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "cannot created",
        err: err,
      });
    });
}

// find specific post on db

function showOne(req, res) {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "cannot find!",
      });
    });
}

// find all post on db

function showAll(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "cannot find!",
      });
    });
}

// update post

function update(req, res) {
  const id = req.params.id;
  const updatePost = {
    titre: req.body.titre,
    contenu: req.body.contenu,
    imageUrl: req.body.image_url,
    categorie: req.body.categorie,
  };

  models.Post.update(updatePost, { where: { id: id } }).then((result) => {
    res
      .status(200)
      .json({
        message: "Post Updated!",
        post: updatePost,
      })
      .catch((err) => {
        res.status(500).json({
          message: "cannot update!",
          err: err,
        });
      });
  });
}


// delete post


function destroyPost(req, res) {
  models.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId === req.user.userId || req.user.role === "admin") {
        post.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "post deleted!" });
      } else {
        res.status(404).json({ message: "cannot deleted!" });
      }
    })
    .catch((error) => console.log(error));
}

// likecount

function likeCount (req, res){
  
}

module.exports = {
  save: save,
  showOne: showOne,
  showAll: showAll,
  update: update,
  destroyPost: destroyPost,
};
