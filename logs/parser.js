//var regex = require('regex');
var database = require('./database');

var db = new database();

function parser (data) {
    return new Promise((resolve, reject) => {
        var lines = [];
        //console.log(data.toString());
        data.toString().split('\n').forEach(function (line, idx, array) {
            //console.log(lines);
            if (line.length > 0) {
                if (idx !== array.length-1) lines.push(parseLine(line));
                else {
                    //console.log("last line length ", Buffer.byteLength(line,'utf-8'));
                    if (lines.length > 0) {
                        db.insert(lines, (err) => {
                            if (err) return reject(err);
                        });
                    }
                    return resolve(Buffer.byteLength(line,'utf-8'));
                }
            }
    })});
}

var parseLine = (line) => {
    var ip = line.substr(0, line.indexOf(' '));
    var time = line.substr(line.indexOf('[')+1, line.indexOf(']')-line.indexOf('[')-1);
    var request = line.substr(line.indexOf('"'));

    var logEntry = {
        'ip': ip,
        'datetime': time,
        'request': request
    };
    return logEntry;
}

module.exports = parser;