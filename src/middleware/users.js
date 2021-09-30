const jwt = require("jsonwebtoken");
const config = require("../config");

const isValid = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ error: "no tienes acceso1" });
  }

  const data = jwt.verify(token, config.jwt.secret);
  if (!data) {
    return res.json({ error: "no tienes acceso" });
  }

  // if (data.admin !== true) {
  //   return res.json({ error: "no tienes acceso" });
  // }

  next();
};

module.exports = {
  isValid,
};
