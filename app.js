var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var throttle = require('./routes/throttle');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', throttle);

var RateLimit = require('express-rate-limit');
 
//app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
 
var apiLimiter = new RateLimit({
  windowMs: 60*1000, // 15 minutes
  max: 1,
  delayMs: 0 // disabled
});
 
// only apply to requests that begin with /api/
//app.use('/api/', apiLimiter);
app.use('/', apiLimiter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;