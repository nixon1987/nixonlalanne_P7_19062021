const models = require("../models");
const user = require("../controllers/user.controller");

// save like on db
function saveLike(req, res) {
  const like = {
    userId: req.user.userId,
    like: req.body.like,
    idPost: req.params.id,
  };

  models.Like.create(like)
    .then((result) => {
      res.status(201).json({
        message: "like created!",
        like: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "cannot created",
        err: err,
      });
    });
}

// like comment

// function likeComment(req, res, next) {
//   like = req.body.like;
//   userId = req.body.userId;
//   idPost = req.params.id;
//   if (like == 1) {
//     Like.findByPk(id)
//       .then((comment) => {
//         Like.usersLiked.push(userId);
//         Like.likes += 1;
//         Like.save()
//           .then(() => res.status(201).json({ message: "Post likée" }))
//           .catch((error) => res.status(400).json({ error }));
//       })
//       .catch((error) => res.status(500).json({ error }));
//   } else if (like == 0) {
//     Like.findByPk(id)
//       .then((like) => {
//         if (
//           !like.usersLiked.includes(userId) &&
//           !like.usersDisliked.includes(userId)
//         ) {
//           res.status(400).json({ error: `Vous n'avez pas liké ni disliké` });
//         }
//         if (like.usersLiked.includes(userId)) {
//           let position = like.usersLiked.indexOf(userId);
//           like.usersLiked.splice(position, 1);
//           like.likes--;
//           like
//             .save()
//             .then(() => res.status(201).json({ message: "Post unlikée" }))
//             .catch((error) => res.status(400).json({ error }));
//         } else {
//           let position = like.usersDisliked.includes(userId);
//           like.usersDisliked.splice(position, 1);
//           like.dislikes--;
//           like
//             .save()
//             .then(() => res.status(201).json({ message: "Post undislikée" }))
//             .catch((error) => res.status(400).json({ error }));
//         }
//       })
//       .catch((error) => res.status(500).json({ error }));
//   } else {
//     like
//       .findByPk(id)
//       .then((comment) => {
//         like.usersDisliked.push(userId);
//         like.dislikes += 1;
//         like
//           .save()
//           .then(() => res.status(201).json({ message: "Post dislikée" }))
//           .catch((error) => res.status(400).json({ error }));
//       })
//       .catch((error) => res.status(500).json({ error }));
//   }
// }

// find all like on db

// function showAllLike(req, res) {
//   models.like
//     .findAll()
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "cannot find!",
//       });
//     });
// }

module.exports = {
  // likeComment: likeComment,
  // showAllLike: showAllLike,
  saveLike: saveLike,
};
