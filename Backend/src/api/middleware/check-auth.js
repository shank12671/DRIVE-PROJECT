const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next()
  } catch (error) {
    return res.status(401).json({
      Message: "Auth Failed",
    });
  }
};
