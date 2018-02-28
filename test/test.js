/**
 * Tests.
 */
require('dotenv').config();
const fs = require('fs');
const assert = require('assert');
const should = require('chai').should();
const rewire = require('rewire');
const parser = rewire("../server/log_management/parser");
//var users = rewire("../server/routes/users");
const tools = require('../server/tools');
const database = require('../server/database');
const logInfo = require('../server/log_management/log-info');
const logManager = require('../server/log_management/manage-logs');
const config = require('../settings/backend');
const logger = require('../server/logger');

const db = new database();

logger.remove(logger.transports.Console);

/*
describe('Default', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});*/

let infoFile = {
    data: []
};

logManager(config.input_dir);

describe('Log Management', function () {

    describe('parser', function () {
        describe('#parseLine()', function () {
            let line = '195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /services/test/nesmysly"';
            let parseLine = parser.__get__('parseLine');
            let parsed = parseLine(line);

            it('ip is valid', function () {
                (parsed.ip).should.be.a('string');
                //(parsed.ip).should.be.equal.to('195.113.20.155');
            });

            it('datetime is valid', function () {
                //TODO dk: look up how to check if it's a valid timestamp
                // ... that is not really the point of it, is it?
            });

            it('service is valid', function () {
                (parsed.service).should.be.a('string');
            });

            it('request is valid', function () {
                (parsed.request).should.be.a('string');
                //(parsed.ip).should.be.equal.to('/services/test/nesmysly');
            });

            line = '195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "POST /services/test/nesmysly"';
            parseLine = parser.__get__('parseLine');
            parsed = parseLine(line);

            it('non-GET is not considered useful', function () {
                (parsed.service).should.equal('NULL');
            });

            line = '195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /repository/test/nesmysly"';
            parseLine = parser.__get__('parseLine');
            parsed = parseLine(line);

            it('non-service is properly identified', function () {
                (parsed.service).should.equal('NULL');
            });
        })
    });

    describe('log-info', function () {
        let safety;

        before(function () {
            //safety precaution not to lose data
            if ("undefined" !== typeof process.env.RESET_LOGS && process.env.RESET_LOGS.toLowerCase() === 'false') {
                safety = logInfo.getInfo();
            }
            logInfo.setupInfo(true);
        });

        after(() => {
            if ("undefined" !== typeof process.env.RESET_LOGS && process.env.RESET_LOGS.toLowerCase() === 'false') {
                logInfo.setupInfo(true);
                safety.data.forEach(function(item) {
                    logInfo.setSingleInfo(item.name, item.bytesRead);
                });
            }
        });

        it('Getting default info', function () {
            infoFile = logInfo.getInfo();
            infoFile.data.should.have.lengthOf(0);
        });

        it('Add new single info', function () {
            logInfo.setSingleInfo('testname', 137);
            infoFile = logInfo.getInfo();
            infoFile.data.should.have.lengthOf(1);
            infoFile.data[0].name.should.equal('testname');
            infoFile.data[0].bytesRead.should.equal(137);
        });

        it('Update existing single info', function () {
            logInfo.setSingleInfo('testname', 157);
            infoFile = logInfo.getInfo();
            infoFile.data.should.have.lengthOf(1);
            infoFile.data[0].name.should.equal('testname');
            infoFile.data[0].bytesRead.should.equal(157);
        });

        it('Additional false setup', function () {
            logInfo.setupInfo(false);
            infoFile = logInfo.getInfo();
            infoFile.data.should.not.have.lengthOf(0);
        });

        it('All data are unique', function () {
            logInfo.setSingleInfo('testname', 100);
            let keys = [];
            infoFile.data.forEach(function (item) {
                keys.push(item.name);
            });
            keys.should.have.lengthOf(keys.filter(function(elem, pos) { return keys.indexOf(elem) === pos; }).length);
        });
    });

    if (!process.env.TRAVIS === true) {
        describe('log rotation', function () {

            before(function () {

                let content = '195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /services/test/nesmysly"';

                try {
                    fs.writeFileSync('./public/logs/test-file.log', content);
                } catch (e) {
                    console.log("Cannot write file ", e);
                }
            });

            it('new file gets noticed', () => {

                // here it should run the log management process

                infoFile = logInfo.getInfo();

                let check = false;
                infoFile.data.forEach(function (element) {
                    console.log(element.name);
                    if (element.name === 'test-file.log') {
                        check = true;
                    }
                });
                check.should.be.true;
            });

            it('new file gets read', () => {

                infoFile = logInfo.getInfo();

                let check = 0;
                infoFile.data.forEach(function (element) {
                    if (element.name === 'test-file.log') {
                        check = element.bytesRead;
                    }
                });
                check.should.equal(77);
            });
        });
    }
});

describe('Database', function () {

    if (!process.env.TRAVIS === true) {
        describe('#authenticate', function () {
            const user = 'david';
            it('database provides valid info', (done) => {
                db.authenticate(user, 'heslo')
                    .then(data => {
                        data.should.be.a('Array');
                        data.should.have.lengthOf(1);
                        data[0].username.should.equal(user);
                    })
                    .then(done, done);
            });
            it('wrong password gets empty result', (done) => {
                db.authenticate(user, 'aaa')
                    .then(data => {
                    })
                    .catch(data => {
                        data.state.should.equal('failure');
                    })
                    .then(done, done);
            });
        });
        describe('#addAccount', function () {
            it('user already exists', (done) => {
                const username = 'johndoe';
                const password = 'password';
                db.addAccount(username, password)
                    .then(data => {
                        should.fail;
                    })
                    .catch(data => {
                        data.state.should.equal('failure');
                        data.reason.should.equal('Username already exists');
                    })
                    .then(done, done);
            });
        });
    }
});

describe('Others', function () {
    describe('#validateIPaddress @routes/users', function () {
        const validate = tools.validateIPaddress;
        it('valid ip should be true', function() {
            validate('127.0.0.1').should.be.true;
        });
        it('invalid ip should be false', function() {
            validate('127.0.0.300').should.be.false;
            validate('127.0.0.30.0').should.be.false;
        });
    })
})
