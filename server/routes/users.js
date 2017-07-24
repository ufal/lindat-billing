/**
 * Backend of the user-to-data-access showing page
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
const database = require('../log_management/database');
const logger = require('winston');
const validateIPaddress = require('../tools').validateIPaddress;

let logs = [];

const db = new database();

//log_management = parser('195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /Shibboleth.sso/DiscoFeed HTTP/1.1" 200 389353 "-" "Java/1.8.0_45"');
//db.insert();
//console.log(log_management);

router.get('/users/*', function (req, res, next) {
    // select relevant data from database
    const request = req.url.split(['/']);
    const id = request[2];
    const from = request[3].substr(5);
    const to = request[4].substr(3);
    if (validateIPaddress(id)) {
        logger.debug("SELECT * from logs WHERE ip = '" + id + "'::inet and datetime > to_timestamp('"
            + from + "', 'DD-MM-YYYY') and datetime <= to_timestamp('" + to + "', 'DD-M-YYYY')");
        db.select(" WHERE ip = '" + id + "'::inet and datetime > to_timestamp('" + from
            + "', 'DD-MM-YYYY') and datetime <= to_timestamp('" + to + "', 'DD-M-YYYY')")
            .then(data => {
                let dataModified = [];
                let empty = true;
                for(let i = 0; i < db.getServiceCount(); i++) {
                    dataModified.push({
                        name: db.getServiceName(i+1),
                        logData: [],
                        expanded: false,
                        total: 0
                    });
                }
                data.forEach(function (item) {
                    dataModified[item.id_s].logData.push(item);
                });
                dataModified.forEach(function (item) {
                    item.total = item.logData.length;
                    if (item.total > 0) empty = false;
                });
                if (empty) res.json(["EMPTY", ""]);
                else res.json(dataModified);
            })
            .catch(err => {
                res.json(["ERROR", err.message]);
            });
    } else {
        if (id.length > 0) res.json(["ERROR", "Your input is not a valid IP address"]);
        else res.json(["EMPTY", ""]);
    }
});

// get all data
/*router.get('/users', function (req, res, next) {
    log_management = db.select("");
    res.json(log_management);
})*/

module.exports = router;
