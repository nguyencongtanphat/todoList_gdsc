const jwt = require("jsonwebtoken");
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
      res.json({ message: "request must attach authorization token" });
    }
  } catch (err) {
    res.status(505).json({ err });
  }
};
module.exports = authen;
