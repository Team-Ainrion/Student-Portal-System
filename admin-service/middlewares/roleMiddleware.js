module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied: Insufficient role" });
    }
    next();
  };
};
