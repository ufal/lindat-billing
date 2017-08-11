/**
 * Tests.
 */
require('dotenv').config();
const assert = require('assert');
const should = require('chai').should();
const rewire = require('rewire');
const parser = rewire("../server/log_management/parser");
//var users = rewire("../server/routes/users");
const tools = require('../server/tools');
const database = require('../server/database');

const db = new database();

/*
describe('Default', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});*/

describe('Parser', function () {
    describe('#parseLine()', function () {
        const line = '195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /services/test/nesmysly"';
        const parseLine = parser.__get__('parseLine');
        const parsed = parseLine(line);

        it('ip is valid', function () {
            (parsed.ip).should.be.a('string');
            //(parsed.ip).should.be.equal.to('195.113.20.155');
        });

        it('datetime is valid', function () {
            //TODO dk: look up how to check if it's a valid timestamp
            // ... that is not really the point of it, is it?
        });

        it('service is valid', function () {
            (parsed.service).should.be.a('boolean');
        });

        it('request is valid', function () {
            (parsed.request).should.be.a('string');
            //(parsed.ip).should.be.equal.to('/services/test/nesmysly');
        });
    })
});

describe('Database', function () {
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
