/**
 * The core taking care of routing.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../settings/backend');
const logManager = require('./log_management/manage-logs');
const logger = require('winston');

const users = require('./routes/users');
const login = require('./routes/login');
const tools = require('./routes/other');
const logging = require('./routes/logging');
const pricing = require('./routes/pricing');

const app = express();

// TODO(jm) use e.g., env.variable
app.use(cors({origin: process.env.CORS || 'https://ufal-point-dev.ms.mff.cuni.cz/services/lindat-billing/'}));

/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);*/

// static files
app.use(express.static(path.join(__dirname, '..', 'src')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(cookieParser());

// configuration
logger.info("Using [%s] as input path", config.input_dir);

// API
app.use('/api', users);
app.use('/api', login);
app.use('/api', pricing);
app.use('/api', tools);
app.use('/api', logging);

// initiate logmanager
logManager(config.input_dir);
//TODO takes relative math, should be configurable

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
