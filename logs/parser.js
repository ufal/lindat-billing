//var regex = require('regex');
var database = require('./database');

var db = new database();

function parser (data) {
    data.toString().split('\n').forEach(function (line) {
        if (line.length > 0) parseLine(line, addLine);
    });
}

var parseLine = function (line, callback) {
    var ip = line.substr(0, line.indexOf(' '));
    var time = line.substr(line.indexOf('[')+1, line.indexOf(']')-line.indexOf('[')-1);
    var request = line.substr(line.indexOf('"'));
    callback([ip, time, request]);
}

var addLine = function (line) {
    db.insert(line[0], line[1], line[2]);
}

module.exports = parser;