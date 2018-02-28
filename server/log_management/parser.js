/**
 * Parsing the logs into a json object.
 */
const logger = require('winston');
const fs = require('fs');
const readLine = require('readline');
const Stream = require('stream');
const Database = require('../database');

const db = new Database();

/**
 *
 * @param data The data do be parsed.
 * @returns {Promise}
 */
function parseString (data) {
    logger.debug('Parsing logs as STRING');
    return new Promise((resolve, reject) => {
        let lines = [];
        let logEntry;
        data.toString().split('\n').forEach(function (line, idx, array) {
            if (line.length > 0) {
                if (idx !== array.length-1) {
                    logEntry = parseLine(line);
                    // filtering out not services
                    if (logEntry.service !== 'NULL')
                        lines.push(logEntry);
                }
                else {
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
 * @param fileName Path to the file to be fully parsed.
 * @returns {Promise}
 */
function parseFile (fileName, start) {
    logger.debug('Parsing logs as FILE beggining at', start, 'bytes');
    return new Promise((resolve, reject) => {
        const inStream = fs.createReadStream(fileName, {});
        const outStream = new Stream;
        const rl = readLine.createInterface(inStream, outStream);
        let lines = [];
        let logEntry;
        let processed = 0;

        rl.on('line', function (line) {
            if (processed >= start) {
                if (line.length > 0) {
                    logEntry = parseLine(line);
                    // filtering out not services
                    if (logEntry.service !== 'NULL')
                        lines.push(logEntry);
                }
            } else {
                processed += Buffer.byteLength(line,'utf-8');
            }
        });
        db.insert(lines);
        return resolve();
    })
}



/**
 *
 * @param line
 * @returns {{ip: string, datetime: string, service: boolean, request: string}}
 */
let parseLine = (line) => {
    const ip = line.substr(0, line.indexOf(' '));
    const time = line.substr(line.indexOf('[')+1, line.indexOf(']')-line.indexOf('[')-1);
    const request = line.substr(line.indexOf('"'));
    let service = 'NULL';
    if (request.substr(1,3) === "GET" && request.indexOf('/services/') !== -1) {
        service = request.substr(5).split(['/'])[2];
    }
    return {
        'ip': ip,
        'datetime': time,
        'service' : service,
        'request': request
    }
};

module.exports = {
    parseFile,
    parseString
};