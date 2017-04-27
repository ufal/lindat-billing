var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var config = require('../settings/backend');
var users = require('./routes/users');
var logmanager = require('./logs/manage-logs');

var app = express();

// TODO(jm) use e.g., env.variable
app.use(cors({origin: 'https://ufal-point-dev.ms.mff.cuni.cz/services/lindat-billing/'}));

/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);*/

// static files
app.use(express.static(path.join(__dirname, '..', 'src')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(cookieParser());

// configuration
console.log("Using [%s] as input path", config.input_dir);

// API
app.use('/api', users);

// initiate logmanager
logmanager(config.input_dir);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // TODO(jm) commented out
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
        error: {},
        message: err.message,
  });
});

module.exports = app;
