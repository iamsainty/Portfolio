const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateUserToken = (req, res, next) => {
  const token = req.header("userToken");
  if (!token) {
    return res.status(401).json({ validToken: false });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    if (decoded.role === "user") {
      next();
    }
  } catch (error) {
    return res.status(401).json({ validToken: false });
  }
};

module.exports = validateUserToken;