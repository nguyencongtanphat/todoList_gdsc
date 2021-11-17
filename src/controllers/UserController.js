const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
  signup: (req, res, next) => {
    bcrypt
      .hash(req.body.password, saltRounds)
      .then((hash) => {
        const newUser = new UserModel({
          userName: req.body.userName,
          password: hash,
          email: req.body.email,
        });
        newUser
          .save()
          .then((result) => {
            res.json({ message: "signup successful" });
          })
          .catch((err) => {
            res.status(404).json({ message: err.message });
          });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
};

module.exports = userController;
