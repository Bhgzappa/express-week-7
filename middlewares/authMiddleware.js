const jwt = require("jsonwebtoken");

const secure = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) return res.status(403).send("unauthorized access");

  const verify_token = jwt.verify(token, process.env.SECRET_CODE);
  req.user = verify_token;
  next();
};
module.exports = secure;
