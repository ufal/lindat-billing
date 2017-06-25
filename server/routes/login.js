/**
 * Backend of the login page
 */

const express = require('express');
const router = express.Router();
//const url = require('url');
//const database = require('../log_management/database');
const logger = require('winston');

//const db = new database();

router.post('/authenticate', function (req, res, next) {
    res.json('3');
});

module.exports = router;
