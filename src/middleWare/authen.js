const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
const authen = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.PRIVATE_KEY
      );
      console.log("here");
      UserModel.findOne({ email: decoded.email }).then((user) => {
        console.log("1", user);
        if (user) {
          req.id = user._id;
          next();
        } else {
          res.status(404).json({ message: "user not found" });
          next();
        }
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(505).json({ err });
  }
};
module.exports = authen;
