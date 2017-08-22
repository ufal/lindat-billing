/**
 * Logger for frontend
 */

const express = require('express');
const router = express.Router();
//const url = require('url');
const logger = require('winston');

router.post('/log', function (req, res) {
    console.log(req);
    switch (req.body.level) {
        case 'silly':
            logger.silly(req.body.text);
            break;
        case 'debug':
            logger.debug(req.body.text);
            break;
        case 'verbose':
            logger.verbose(req.body.text);
            break;
        case 'info':
            logger.info(req.body.text);
            break;
        case 'warn':
            logger.warn(req.body.text);
            break;
        case 'error':
            logger.error(req.body.text);
            break;
    }
    res.set('Content-Type', 'text/plain');
    res.send('Thanks for the lovely log!');
});

module.exports = router;