const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
const authen = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.PRIVATE_KEY
      );
      req.body.userId = decoded.id;
      next();
    } else {
      next();
    }
  } catch (err) {
    res.status(505).json({ err });
  }
};
module.exports = authen;
