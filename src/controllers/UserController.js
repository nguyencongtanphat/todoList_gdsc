const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const ApiError = require("../middleWare/error/ApiError");
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
            next(
              ApiError.badRequest(
                "signup fail because userName or email were used" + err
              )
            );
          });
      })
      .catch((err) => {
        next({});
      });
  },
  login: (req, res, next) => {
    //check email
    UserModel.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        //check password
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            const token = jwt.sign(
              { email: user.email, userName: user.userName, id: user._id },
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
          } else {
            next(
              ApiError.badRequest({
                message: "email or password is not correct",
              })
            );
          }
        });
      } else {
        next(
          ApiError.badRequest({ message: "email or password is not correct" })
        );
      }
    });
  },
};

module.exports = userController;
