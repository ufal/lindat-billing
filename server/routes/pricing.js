/**
 * Pricing related information
 */
const logger = require('winston');
const router = require('express').Router();
const Database = require('../database');

const db = new Database();

router.post('/pricing', function (req, res, next) {
    logger.debug("Setting pricing is working");
    let username = req.body.name;
    let body = req.body.data;
    if (username === '') username = 'default';
    logger.debug(body);

    db.setPricing(username, body);
    /*    .then(() => {
            res.json();
        })
        .catch(err => {
            logger.error(err);
            res.json(["ERROR", err]);
        });*/
});

router.get('/pricing/*', function (req, res, next) {
    logger.debug("Getting pricing information");
    const request = req.url.split(['/']);
    const id = request[2].length > 0 ? request[2] : 'default';
    db.getPricing(id)
        .then(prices => {
            let data = [];
            for(let item in prices) {
                if (item > 0) data.push(prices[item]);
            }
            res.json(data);
        })
        .catch(err => {
            logger.error(err);
            res.json(["ERROR", err]);
        });
});

module.exports = router;
