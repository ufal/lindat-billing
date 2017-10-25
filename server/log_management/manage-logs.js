/**
 * Takes care of logs management.
 *  Checks current state of log processing.
 *  Sets watcher on log files.
 *  Processes new logs.
 */
const fs = require('fs');
const tail = require('./tail');
const fileParser = require('./parser').parseFile;
const info = require('./log-info');
const logger = require('../logger');
const validateLine = require('../tools').validateLogLine;

let infoFile = {
    data: []
};

function readFiles(dirName) {
    if ("undefined" !== typeof process.env.RESET_LOGS) {
        if (process.env.RESET_LOGS.toLowerCase() === 'false') info.setupInfo(false);
        if (process.env.RESET_LOGS.toLowerCase() === 'true') info.setupInfo(true);
    }
    else { info.setupInfo(true); } // default if not specified
    infoFile = info.getInfo();
    fs.readdir(dirName, (err, fileNames) => {
        if (err) {
            onError(err);
            return;
        }
        logger.verbose("Log files present: " + fileNames.length);

        fileNames.forEach(function(filename) {
            logger.debug(dirName + '/' + filename);
            if (!process.env.ACCESS_LOG_ONLY || filename === 'access.log') {
                /*if (checkContent(dirName + '/' + filename))*/
                    onFileContent(dirName + '/' + filename);
            }
        });
    });
}

function onError(error) {
    // handle specific listen errors with friendly messages
    logger.error(error);
}

function checkContent(filename) {
    const fd = fs.openSync(filename, 'r');
    const bufferSize = 1024;
    let buffer = new Buffer(bufferSize);

    let read, line, idx;
    read = fs.readSync(fd, buffer, 0, bufferSize, null);
    line = buffer.toString('utf8', 0, read);
    while ((idx = line.indexOf("\n",0)) === -1 ) {
        read = fs.readSync(fd, buffer, 0, bufferSize, null);
        line += buffer.toString('utf8', 0, read);
    }
    line = line.substring(0, idx);
    validateLine(line);
}

function onFileContent(filePath) {
    const filename = filePath.substr(filePath.lastIndexOf('/') + 1);
    let alreadyRead = 0;
    infoFile.data.forEach(function (item) {
        if (item.name === filename) alreadyRead = item.bytesRead;
    });
    // the size of the file in bytes
    const size = fs.statSync(filePath)["size"];
    if (alreadyRead < size) {
        fileParser(filePath, alreadyRead)
            .catch(error => {
                logger.error(error);
            });
        info.setSingleInfo(filename, size);
    } else {
        logger.verbose('File', filename, 'is up to date');
    }
    tail.tailFile(filePath, fs.statSync(filePath)["size"] - size, size, true, (err, filename, data, unsubscribe) => {
        if (err) {
            logger.error(err);
        }});
}

module.exports = readFiles;