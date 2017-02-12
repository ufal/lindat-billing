var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var database = require('../logs/database');

var logs = [];

var db = new database();

//logs = parser('195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /Shibboleth.sso/DiscoFeed HTTP/1.1" 200 389353 "-" "Java/1.8.0_45"');
//db.insert();
//console.log(logs);

router.get('/users/*', function (req, res, next) {
    // select relevant data from database
    var id = req.url.substr(7);
    //console.log(" WHERE ip = '" + id + "'::inet");
    //logs = db.select(" WHERE ip = '" + id + "'::inet", res.json);
    //console.log("router prints logs: " + logs);
    //res.json(logs);
    db.select(" WHERE ip = '" + id + "'::inet", function(err,data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        } else {
            // code to execute on data retrieval
            //console.log("result from db is : ", data);
            res.json(data);
        }
    });
})

// get all data
router.get('/users', function (req, res, next) {
    logs = db.select("");
    res.json(logs);
})

module.exports = router;
