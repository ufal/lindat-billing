/**
 * Backend of the user-to-data-access showing page
 */

const express = require('express');
const router = express.Router();
/*const fs = require('fs');
const url = require('url');*/
const Database = require('../database');
const logger = require('winston');
const validateIPAddress = require('../tools').validateIPaddress;

const db = new Database();

router.get('/users/accounts', function (req, res, next) {
    db.getAllAccounts()
        .then(data => {
            let dataModified = [];
            let last = "";
            let ips = [];
            data.forEach(function (item) {
                if (item.username !== last) {
                    if (last.length !== 0)
                        dataModified.push({ name: item.username, ips: ips, expanded: false });
                    last = item.username;
                    ips = [item.ip];
                } else {
                    ips.push(item.ip);
                }
            });
            dataModified.push({ name: last, ips: ips, expanded: false });
            res.json(dataModified);
        })
        .catch(err => {
            res.json(["ERROR", err]);
        });
});

router.post('/users/account/addNewIP', function (req, res, next) {
    db.addNewIP(req.body)
        .then(data => {
            res.status(200);
            res.json('SUCCESS');
        })
        .catch(error => {
            res.status(400);
            res.json('ERROR');
        });
});

router.post('/users/account/reportIP', function (req, res, next) {
    res.status(200);
    res.json('...');
});

router.get('/users/account/*', function (req, res, next) {
    const request = req.url.split(['/']);
    const owner = request[3];
    console.log(owner);
    db.getIPs("SELECT * from Users WHERE owner = '" + owner + "'")
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(["ERROR", err]);
        });
});

router.get('/users/*', function (req, res, next) {
    // select relevant data from database
    const request = req.url.split(['/']);
    const id = request[2];
    const from = request[3].substr(5);
    const to = request[4].substr(3);
    if (validateIPAddress(id)) {
        logger.debug("SELECT * from logs WHERE ip = '" + id + "'::inet and datetime > to_timestamp('"
            + from + "', 'DD-MM-YYYY') and datetime <= to_timestamp('" + to + "', 'DD-MM-YYYY')");
        db.select(" WHERE ip = '" + id + "'::inet and datetime > to_timestamp('" + from
            + "', 'DD-MM-YYYY') and datetime <= to_timestamp('" + to + "', 'DD-MM-YYYY')")
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
