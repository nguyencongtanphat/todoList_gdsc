const jwt = require("jsonwebtoken");
const authen = (req, res, next) => {
  jwt
    .verify(token, process.env.PRIVATE_KEY)
    .then((decoded) => {
      console.log(decoded);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
