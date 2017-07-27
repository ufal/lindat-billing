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
            logger.debug('Retrieved user', data);
            const token = jwt.sign({
                username: req.body.username,
                admin: true
            },
                'secret',
                { expiresIn: 15 }
                );
            logger.debug('Password correct');
            logger.info('Issued token');
            res.status(200);
            res.json({
                success: true,
                message: 'Enjoy the token!',
                token: token
            });
        })
        .catch(error => {
            console.log(error);
            //res.send(error);
            res.status(401);
            res.json({
                success: false,
                message: error
            });
        });
});

module.exports = router;
