const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup function

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.send(409).json({ message: "email already exist!" });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.mot_de_passe, salt, function (err, hash) {
            const user = {
              nom: req.body.nom,
              prenom:req.body.prenom,
              email: req.body.email,
              mot_de_passe: hash,
              role:req.body.role,
            };

            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "user created!",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "cannot create the user!",
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
}

// login function

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid!",
        });
      } else {
        bcryptjs.compare(
          req.body.mot_de_passe,
          user.mot_de_passe,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId:user.id,
                  role:user.role
                },
                "RANDOM_TOKEN_SECRET",
                function (err, token) {
                  res.status(200).json({
                    message: "Authentification ok!",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({ message: "Invalid!" });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
}

module.exports = { signUp: signUp, login: login };
