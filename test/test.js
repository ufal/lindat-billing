/**
 * Tests.
 */
require('dotenv').config();
var assert = require('assert');
var should = require('chai').should();
var rewire = require('rewire');
var parser = rewire("../server/log_management/parser");
var users = rewire("../server/routes/users");

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
        var line = '195.113.20.155 - - [08/Mar/2016:14:48:43 +0100] "GET /services/test/nesmysly"';
        var parseLine = parser.__get__('parseLine');
        var parsed = parseLine(line);

        it('ip is valid', function () {
            (parsed.ip).should.be.a('string');
            //(parsed.ip).should.be.equal.to('195.113.20.155');
        })

        it('datetime is valid', function () {
            //TODO dk: look up how to check if it's a valid timestamp
            // ... that is not really the point of it, is it?
        })

        it('service is valid', function () {
            (parsed.service).should.be.a('boolean');
        })

        it('request is valid', function () {
            (parsed.request).should.be.a('string');
            //(parsed.ip).should.be.equal.to('/services/test/nesmysly');
        })
    })
})

describe('Others', function () {
    describe('#validateIPaddress @routes/users', function () {
        var validate = users.__get__('validateIPaddress');
        it('valid ip should be true', function() {
            validate('127.0.0.1').should.be.true;
        });
        it('invalid ip should be false', function() {
            validate('127.0.0.300').should.be.false;
            validate('127.0.0.30.0').should.be.false;
        });
    })
})
