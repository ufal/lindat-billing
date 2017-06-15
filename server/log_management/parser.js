/**
 * Parsing the logs into a json object.
 * @type {db}
 */

var database = require('./database');

var db = new database();

/**
 *
 * @param data The data do be parsed.
 * @returns {Promise}
 */
function parser (data) {
    return new Promise((resolve, reject) => {
        var lines = [];
        var logEntry;
        //console.log(data.toString());
        data.toString().split('\n').forEach(function (line, idx, array) {
            //console.log(lines);
            if (line.length > 0) {
                if (idx !== array.length-1) {
                    logEntry = parseLine(line);
                    if (logEntry.service)
                        lines.push(logEntry);
                }
                else {
                    //console.log("last line length ", Buffer.byteLength(line,'utf-8'));
                    if (lines.length > 0) {
                        db.insert(lines);
                    }
                    return resolve(Buffer.byteLength(line,'utf-8'));
                }
            }
    })});
}

/**
 *
 * @param line
 * @returns {{ip: string, datetime: string, service: boolean, request: string}}
 */
var parseLine = (line) => {
    var ip = line.substr(0, line.indexOf(' '));
    var time = line.substr(line.indexOf('[')+1, line.indexOf(']')-line.indexOf('[')-1);
    var request = line.substr(line.indexOf('"'));
    var service = false;
    if (request.substr(1,3) == "GET") {
        /*var arrRequest = request.substr(5).split(['/']);
        if (arrRequest[1] == "services")
            service = true;*/
        if (request.indexOf('/services/') !== -1)
            service = true;
    }

    var logEntry = {
        'ip': ip,
        'datetime': time,
        'service' : service,
        'request': request
    };
    return logEntry;
};

module.exports = parser;