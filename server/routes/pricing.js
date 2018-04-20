/**
 * Pricing related information
 */
const router = require('express').Router();
const Database = require('../database');

const db = new Database();

router.get('/pricing/*', function (req, res, next) {
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
            console.log(err)
            res.json(["ERROR", err]);
        });
});

module.exports = router;
