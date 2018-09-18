/**
 * Pricing related information
 */
const logger = require('winston');
const router = require('express').Router();
const Database = require('../database');
const unitSizes = require('../../settings/unitSizes.json');

const db = new Database();

router.post('/pricing', function (req, res, next) {
    let username = req.body.name;
    let body = req.body.data;
    if (username === '') username = 'default';
    body = JSON.parse(body);
    let json = "{\n";
    let data = [];
    for(let item in body) {
        data.push({item: {"name": body[item].name, "value": body[item].value }});
        if (item > 0) json += ",\n";
        json += "\"" + body[item].id + "\": {\"name\": \"" + body[item].name + "\", \"value\": " + body[item].value + "}";
    }
    json += "\n}";
    db.setPricing(username, json)
        .catch(err => {
            logger.error(err);
            res.json(["ERROR", err]);
        });
});

router.get('/pricing/*', function (req, res, next) {
    const request = req.url.split(['/']);
    const id = request[2].length > 0 ? request[2] : 'default';
    db.getPricing(id)
        .then(prices => {
            if (prices === null) {
                db.getPricing('default')
                    .then(prices => {
                        db.addPricing(id);
                        reply(prices.pricing, id, res);
                    })
                    .catch(err => {
                        logger.error(err);
                        res.json(["ERROR", err]);
                    });
            } else {
                reply(prices.pricing, id, res);
            }
        })
        .catch(err => {
            logger.error(err);
            res.json(["ERROR", err]);
        });
});

router.get('/unitsizes', function (req, res, next) {
    let data = [];
    for(let id in unitSizes) {
        data.push(unitSizes[id]);
    }
    res.json(data);
});

reply = (prices, id, res) => {
    let data = [];
    for(let id in prices) {
        prices[id].id = id;
        data.push(prices[id]);
    }
    res.json(data);
};

module.exports = router;
