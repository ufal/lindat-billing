var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.send('index page')
    res.render('index', { title: 'lindat-billing' });
});

module.exports = router;
