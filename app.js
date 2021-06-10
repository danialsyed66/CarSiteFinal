var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var buyRouter = require("./routes/buy");
var sellRouter = require("./routes/sell");
var servicesRouter = require("./routes/services");
var repairRouter = require("./routes/repair");
var carsApiRouter = require("./routes/api/cars");
var sparepartsApiRouter = require("./routes/api/spareparts");
var servicesApiRouter = require("./routes/api/services");

var app = express();

// const DB = "mongodb+srv://danialsyed66:danialsyed@cluster0.pit0y.mongodb.net/CarSite?retryWrites=true&w=majority"
// const DB = "mongodb://localhost/CarSite"
const DB =
  "mongodb+srv://danialsyed66:danialsyed@cluster0.zsvyw.mongodb.net/CarSite?retryWrites=true&w=majority";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/buy", buyRouter);
app.use("/sell", sellRouter);
app.use("/services", servicesRouter);
app.use("/repair", repairRouter);
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
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

module.exports = app;
