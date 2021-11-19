const jwt = require("jsonwebtoken");
const { response } = require("../../app");
const authen = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      console.log("have cookies");
      const token = req.cookies.jwt;
      const decoded = jwt.verify(token, "PRIVATEKEY");
      req.body.userId = decoded.id;
    }
    next();
  } catch (err) {
    res.status(505).json({ err });
  }
};
module.exports = authen;
