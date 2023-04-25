const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  jwt.verify(token, String(process.env.SECRET), (err, decoded) => {
    if (err) {
      res.status(401).send("UNTHORIZED!, Invalid Token!");
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = { verifyToken };
