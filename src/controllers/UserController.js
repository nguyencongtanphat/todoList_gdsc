const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
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
            res
              .status(404)
              .json({ message: "signup failt because " + err.message });
          });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  login: (req, res, next) => {
    //check email
    UserModel.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        //check password
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result) {
              const token = jwt.sign(
                { email: user.email, userName: user.userName },
                process.env.PRIVATE_KEY,
                { expiresIn: "1h" }
              );
              res.status(200).json({
                message: "login successfully",
                userInfo: {
                  userName: user.userName,
                  email: user.userEmail,
                },
                token: token,
              });
            }
          })
          .catch((err) => {
            res.status(404).json({ message: err.message });
          });
      } else {
        res.status(404).json({ message: "email or password is not correct" });
      }
    });
  },
};

module.exports = userController;
