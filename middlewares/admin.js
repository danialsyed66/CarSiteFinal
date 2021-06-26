function admin(req, res, next) {
  if (req.user.role != "admin")
    return res.send("/signin");
  next();
}
module.exports = admin;
