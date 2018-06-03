/**
 * Backend of the login and registration pages
 */

const express = require('express');
const router = express.Router();
//const url = require('url');
const database = require('../database');
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

router.get('/home', function (req, res, next) {
    db.getLogins()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(["ERROR", err]);
        });
});

router.get('/home/*', function (req, res, next) {
    db.getMyLogins(req.url.split(['/'])[2])
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(["ERROR", err]);
        });
});

router.post('/accounts', function (req, res, next) {
    logger.debug('Adding new user', req.body.username);
    //db.addAccount(req.body.username, req.body.password)
    db.addAccountNew(req.body.username, req.body.password)
        .then(data => {
            onAddSuccess(req.body.username, res);
        })
        .catch(error => {
            onFailure(error, res);
        });
});

onAddSuccess = (data, res) => {
    logger.verbose('Registration successful');
    const token = getToken(data, true); // change to false once not needed!
    issueToken(res, token);
};

onSuccess = (data, res) => {
    const token = getToken(data[0].username, data[0].admin);
    issueToken(res, token);
};

issueToken = (res, token) => {
    logger.verbose('Issued token');
    res.status(200);
    res.json({
        success: true,
        message: 'Enjoy the token!',
        token: token
    });
};

onFailure = (error, res) => {
    res.status(401);
    res.json({
        success: false,
        message: error
    });
};

getToken = (username, admin) => {
    const token = jwt.sign({
            username: username,
            admin: admin
        },
        'secret',
        { expiresIn: 15 * 60 }
    );
    return token;
};

module.exports = router;
