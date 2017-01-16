var express = require('express');
var router = express.Router();
var fs = require('fs');

var logs = [];
var id = "";

router.get('/', function(req, res, next) {
    logs = [];
    fs.readFileSync('./public/access_short.log').toString().split('\n').forEach(function (line) {
        id = req.baseUrl.substr(1);
        var logId = line.substr(0,line.indexOf(' '));
        if (id == logId)
        {
            logs.push(line + "\n");
        }
    });
    res.render('users', { title: 'lindat-billing', user: id, logs: logs });
});

module.exports = router;
