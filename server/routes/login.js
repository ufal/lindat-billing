/**
 * Backend of the login page
 */

const express = require('express');
const router = express.Router();
//const url = require('url');
const database = require('../log_management/database');
const logger = require('winston');
const jwt = require('jsonwebtoken');

const db = new database();

router.post('/authenticate', function (req, res, next) {
    logger.debug('Authenticating', req.body);
    db.authenticate(req.body.username, req.body.password)
        .then(data => {
            onSuccess(data, res);
        })
        .catch(error => {
            onFailure(error, res);
        });
});

router.post('/accounts', function (req, res, next) {
    logger.debug('Adding new user', req.body.username);
    db.addAccount(req.body.username, req.body.password)
        .then(data => {
            onSuccess(data, res);
        })
        .catch(error => {
            onFailure(error, res);
        });
});

onSuccess = (data, res) => {
    const token = getToken(data);
    logger.info('Issued token');
    res.status(200);
    res.json({
        success: true,
        message: 'Enjoy the token!',
        token: token
    });
};

onFailure = (error, res) => {
    console.log(error);
    //res.send(error);
    res.status(401);
    res.json({
        success: false,
        message: error
    });
}

getToken = (data) => {
    const token = jwt.sign({
            username: data[0].username,
            admin: data[0].admin
        },
        'secret',
        { expiresIn: 15 }
    );
    return token;
};

module.exports = router;
