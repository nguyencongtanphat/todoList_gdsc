const UserModel = require("../model/User");

const userController = {
  signup: (req, res, next) => {
    const newUser = new UserModel({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
    });
    newUser
      .save()
      .then((result) => {
        res.json({ message: "signup successful" });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
};

module.exports = userController;
