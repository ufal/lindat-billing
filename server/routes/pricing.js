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
    body = JSON.parse(body);
    let json = "{\n";
    let data = [];
    for(let item in body) {
        logger.debug(body[item]);
        data.push({item: {"name": body[item].name, "value": body[item].value }});
        if (item > 0) json += ",\n";
        json += "\"" + body[item].id + "\": {\"name\": \"" + body[item].name + "\", \"value\": " + body[item].value + "}";
    }
    json += "\n}";
    logger.debug(json);
    db.setPricing(username, json);
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
            for(let id in prices) {
                prices[id].id = id;
                data.push(prices[id]);
            }
            res.json(data);
        })
        .catch(err => {
            logger.error(err);
            res.json(["ERROR", err]);
        });
});

module.exports = router;
