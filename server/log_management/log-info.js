const path = require('path');
const fs = require('fs');
const jsonName = './log-files.json';
const logger = require('winston');

let infoFile = {
    data: []
};

let reset;

readInfo = () => {
    // else part also sets the default value when not set
    if ("undefined" !== typeof process.env.RESET_LOGS && process.env.RESET_LOGS.toLowerCase() === 'false')
        reset = false;
    else reset = true;

    if (reset) {
        reset = false;
        logger.info('Log reading info was reset as requested');
        writeInfo();
        return;
    }

    if (fs.existsSync(path.join(__dirname, jsonName))) {
        try {
            let content = fs.readFileSync(path.join(__dirname, jsonName), 'utf8');
            if (content !== "\"{}\"") infoFile = JSON.parse(content);
        } catch (err) {
            logger.info('Log reading info was invalid and thus reset');
        }
    }
};

writeInfo = () => {
    fs.writeFile('./server/log_management/' + jsonName, JSON.stringify(infoFile), (err) => {
        if (err) return logger.error(err);
        logger.verbose('Writing', infoFile, 'to', jsonName);
    });
};

getInfo = () => {
    if (infoFile.data.length === 0) readInfo();
    return infoFile;
};

setInfo = (data) => {
    infoFile = data;
    writeInfo();
};

setSingleInfo = (filename, alreadyRead) => {
    infoFile.data.forEach(function (item) {
        if (item.name === filename && item.bytesRead < alreadyRead)
            item.bytesRead = alreadyRead;
        }
    );
    writeInfo();
};

module.exports = {getInfo, setInfo, setSingleInfo};