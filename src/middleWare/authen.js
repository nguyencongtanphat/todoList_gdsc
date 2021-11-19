const jwt = require("jsonwebtoken");
const authen = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decoded = jwt.verify(req.headers.authorization, "PRIVATEKEY");
      req.body.userId = decoded.id;
    }
    next();
  } catch (err) {
    res.status(505).json({ err });
  }
};
module.exports = authen;
