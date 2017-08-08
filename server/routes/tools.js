/**
 * Backend tools needed by the frontend
 */
const router = require('express').Router;
const version = require('../../package.json').version;

router.get('/version', function (req, res, next) {
    res.json(version);
});
