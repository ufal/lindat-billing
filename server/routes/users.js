/**
 * Backend of the user-to-data-access showing page
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var database = require('../log_management/database');

var logs = [];

var db = new database();

//log_management = parser('195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /Shibboleth.sso/DiscoFeed HTTP/1.1" 200 389353 "-" "Java/1.8.0_45"');
//db.insert();
//console.log(log_management);

router.get('/users/*', function (req, res, next) {
    // select relevant data from database
    var request = req.url.split(['/']);
    var id = request[2];
    var from = request[3].substr(5);
    var to = request[4].substr(3);
    if (validateIPaddress(id)) {
        console.log("SELECT * from logs WHERE ip = '" + id + "'::inet and datetime > '" + from + "' and datetime <= '" + to + "'");
        db.select(" WHERE ip = '" + id + "'::inet and datetime > '" + from + "' and datetime <= '" + to + "'")
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(["ERROR", err.message]);
            });
    } else {
        if (id.length > 0) res.json(["ERROR", "Your input is not a valid IP address"]);
        else res.json(["EMPTY", ""]);
    }
});

/**
 * Checks the validity of an IP address.
 * @param {string} ipAddress - The IP address to be checked.
 * @returns {boolean} - Returns true if it is valid.
 */
function validateIPaddress(ipAddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
        return (true);
    }
    return (false);
}

// get all data
/*router.get('/users', function (req, res, next) {
    log_management = db.select("");
    res.json(log_management);
})*/

module.exports = router;
