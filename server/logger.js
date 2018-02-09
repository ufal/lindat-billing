/**
 * Setup of the winston logger
 *
 * Levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 *
 * error:   Real problems preventing the thing to from running
 * warn:    Potential problems that do not mean the whole app will crash
 * info:    Important information
 * verbose: Information helpful to understand the process
 * debug:   Checking what happens
 * silly:   Well ...
 *
 */
const logger = require('winston');

logger.remove(logger.transports.Console);

// console logging
logger.add(logger.transports.Console,   {
        name: 'console',
        colorize: true,
        level: 'silly',
        humanReadableUnhandledException: true,
        showLevel: true,
        timestamp: true
    });

// file logging
if (process.env.NODE_ENV === 'production')
    logger.add(logger.transports.File, {
        name: 'production',
        timestamp: true,
        level: 'info',
        filename: __dirname + "/../logs/production.log"
    });
else
    logger.add(logger.transports.File, {
        name: 'debug',
        timestamp: true,
        level: 'verbose',
        filename: __dirname + "/../logs/debug.log"
    });



module.exports = logger;