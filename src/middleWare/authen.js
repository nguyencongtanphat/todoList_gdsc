const jwt = require("jsonwebtoken");
const { response } = require("../../app");
const authen = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      req.body.userId = decoded.id;
    }
    next();
  } catch (err) {
    res.status(505).json({ err });
  }
};
module.exports = authen;
