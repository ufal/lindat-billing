/**
 * Backend tools needed by the frontend
 */
const router = require('express').Router();
const version = require('../../package.json').version;

const startTime = Date.now();

router.get('/version', function (req, res, next) {
    res.json(version);
});

router.get('/startTime', function (req, res, next) {
    res.json(startTime);
});

module.exports = router;
