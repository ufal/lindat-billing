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

let infoFile = {
    data: []
};

function readFiles(dirName) {
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
                fs.readFile(dirName + '/' + filename, 'utf-8', (err, content) => {
                    if (err) {
                        onError(err);
                        return;
                    }
                    onFileContent(dirName + '/' + filename, content);
                });
            }
        });
    });
}

function onError(error) {
    // handle specific listen errors with friendly messages
    logger.error(error);
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
        infoFile.data.push({name: filename, bytesRead: size});
        info.setInfo(infoFile);
    } else {
        logger.verbose('File', filename, 'is up to date');
    }
    tail.tailFile(filePath, fs.statSync(filePath)["size"] - size, size, true, (err, filename, data, unsubscribe) => {
        if (err) {
            logger.error(err);
        }});
}

module.exports = readFiles;