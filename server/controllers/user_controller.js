const User = require("../models/user");

const { Op } = require("sequelize");

const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  console.log(req.body);

  console.log("done");
  bcrypt
    .hash(req.body.password, 12)
    .then((hashPassword) => {
      if (hashPassword) {
        const username = req.body.username;
        const password = hashPassword;

        User.create({
          username: username,
          password: password,
        })
          .then((result) => {
            if (result) {
              res.status(200).send("user created");
            } else res.send("not created");
          })
          .catch((err) => {
            res.status(500).send(err || "Something went wrong");
          });
      } else {
        res.send("something went wrong");
      }
    })
    .catch((err) => {
      res.status(500).send(err || "Something went wrong");
    });
};

// Personal Operations

exports.getPersonalInformations = (req, res) => {
  const userId = req.user.id;
  User.findByPk(userId)
    .then((Info) => {
      if (Info) {
        res.status(200).json({ Information: Info });
      } else res.send("something went wrong");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
