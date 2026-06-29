const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/user/login");
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, ...decoded }; // userId → id map kar diya
    next();
  } catch (err) {
    return res.redirect("/user/login");
  }
};
