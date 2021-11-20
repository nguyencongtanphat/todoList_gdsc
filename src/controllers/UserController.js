const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../middleWare/error/ApiError");
const userController = {
  signup: (req, res, next) => {
    bcrypt
      .hash(req.body.password, Number(process.env.SALT_ROUNDS))
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
        next(
          ApiError.badRequest(
            "userName, email or password was not provided" + err
          )
        );
      });
  },
  login: (req, res, next) => {
    //check email
    UserModel.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        //check password
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
              expiresIn: "1h",
            });
            res.cookie("jwt", token, { httpOnly: true, maxAge: "1h" });
            res.status(200).json({
              message: "login successfully",
              userInfo: {
                userName: user.userName,
                email: user.userEmail,
              },
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
  logout: (req, res, next) => {
    if (req.body.userId) {
      res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
      res.status(200).json({
        message: "logout successfully. To see your content please login again",
      });
    } else {
      next(ApiError.badRequest("you're  not login so cannot log out"));
    }
  },
};

module.exports = userController;
