/**
 * Pricing related information
 */
const router = require('express').Router();
let prices = require('../service-prices.json');

router.get('/pricing/*', function (req, res, next) {
    const request = req.url.split(['/']);
    const id = request[2];
    let data = [];

    for(var item in prices) {
        if (item > 0) data.push(prices[item]);
    }
    res.json(data);
});

module.exports = router;
