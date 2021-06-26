function err(req, res, next) {
  //set variable for every pug file
  res.locals.errorToster = "hjjhjhjjhj";
  next();
}

// var errorToster = "foobar";
// // export it
// exports.errorToster = errorToster;

module.exports = err;

