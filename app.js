var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var config = require("config");
var session = require("express-session");
var sessionAuth = require("./middlewares/sessionAuth");
var err = require("./middlewares/err");
// var err = require("./middlewares/err");

var indexRouter = require("./routes/index");
var buyRouter = require("./routes/buy");
var servicesRouter = require("./routes/services");
var repairRouter = require("./routes/repair");
var usersRouter = require("./routes/api/users");
var carsApiRouter = require("./routes/api/cars");
var sparepartsApiRouter = require("./routes/api/spareparts");
var servicesApiRouter = require("./routes/api/services");
const { JsonWebTokenError } = require("jsonwebtoken");
// const { config } = require("process");
global.message = "erroorr";

var app = express();

// const DB = "mongodb://localhost/CarSite"
// const DB = "mongodb+srv://danialsyed66:danialsyed@cluster0.zsvyw.mongodb.net/CarSite?retryWrites=true&w=majority";

app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(sessionAuth);
app.use(err);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/buy", buyRouter);
app.use("/services", servicesRouter);
app.use("/repair", repairRouter);
app.use("/api/users", usersRouter);
app.use("/api/cars", carsApiRouter);
app.use("/api/spareparts", sparepartsApiRouter);
app.use("/api/services", servicesApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

module.exports = app;
