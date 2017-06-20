/**
 * Setup of the winston logger
 *
 * Levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 */
const logger = require('winston');

logger
    .remove(logger.transports.Console)
    .add(logger.transports.Console, {
        colorize: true,
        level: 'silly',
        humanReadableUnhandledException: true,
        showLevel: true
    });

if (process.env.NODE_ENV == 'production')
    logger.add(logger.transports.File, {
        name: 'production',
        timestamp: true,
        level: 'verbose',
        filename: __dirname + "/../logs/production.log"
    });
else
    logger.add(logger.transports.File, {
        name: 'debug',
        timestamp: true,
        level: 'debug',
        filename: __dirname + "/../logs/debug.log"
    });

module.exports = logger;