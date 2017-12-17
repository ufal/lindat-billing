const path = require('path');
const fs = require('fs');
const jsonName = './log-files.json';
const logger = require('winston');

let infoFile = {
    data: []
};

setupInfo = (reset) => {
    if (reset) {
        logger.info('Log reading info was reset as requested');
        resetInfo();
        infoFile = { data: [] };
    }
    //logger.debug('About to read with reset value', reset);
    else readInfo();
};

resetInfo = () => {
    fs.writeFile(path.join(__dirname, jsonName), JSON.stringify(infoFile = { data: [] } ), (err) => {
        if (err)
            return logger.error("ResetInfo: " + err);
        logger.verbose('Log reading has been RESET');
    });
};

readInfo = () => {
    if (fs.existsSync(path.join(__dirname, jsonName))) {
        try {
            let content = fs.readFileSync(path.join(__dirname, jsonName), 'utf8');
            if (content !== "\"{}\"") infoFile = JSON.parse(content);
        } catch (err) {
            logger.info('Log reading info was invalid and IGNORED');
        }
    }
};

writeInfo = () => {
    fs.writeFile(path.join(__dirname, jsonName), JSON.stringify(infoFile), (err) => {
        if (err)
            return logger.error("WriteInfo: " + err);
        logger.verbose('Writing', infoFile, 'to', jsonName);
    });
};

getInfo = () => { // should be called only once
    if (infoFile.data.length === 0) readInfo();
    logger.debug('Getting log reading info:', infoFile);
    return infoFile;
};

setSingleInfo = (filename, alreadyRead, rotated) => {
    let added = false;
    infoFile.data.forEach(function (item) {
        if (item.name === filename) {
            if (item.bytesRead < alreadyRead || rotated) {
                item.bytesRead = alreadyRead;
            }
            added = true;
        }
    });
    if (!added) infoFile.data.push({name: filename, bytesRead: alreadyRead});
    writeInfo();
};

module.exports = {setSingleInfo, setupInfo, getInfo};