var createError = require("http-errors");
var express = require("express");
// var path = require('path');
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var app = express();

const bodyParser = require("body-parser");
const compression = require("compression");

var commonRouter = require("./routes/common");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
// app.use(express.static(path.join(__dirname, 'dist')));
//  app.use('/customers',costomerRouter);
app.use("/common", commonRouter);
// app.use('/admin',adminRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
