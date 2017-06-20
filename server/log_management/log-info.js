const path = require('path');
const fs = require('fs');
const jsonName = './log-files.json';

let infoFile = {
    data: []
};

readInfo = () => {
    if (fs.existsSync(path.join(__dirname, jsonName))) {
        try {
            let content = fs.readFileSync(path.join(__dirname, jsonName), 'utf8');
            if (content != "\"{}\"") infoFile = JSON.parse(content);
        } catch (err) {
            console.log('Log reading info was invalid and thus reset');
        }
    }
};

writeInfo = () => {
    fs.writeFile('./server/log_management/' + jsonName, JSON.stringify(infoFile), (err) => {
        if (err) return console.log(err);
        //console.log(JSON.stringify(infoFile));
        console.log('writing', infoFile, 'to', jsonName);
    });
};

getInfo = () => {
    if (infoFile.data.length == 0) readInfo();
    return infoFile;
};

setInfo = (data) => {
    infoFile = data;
    writeInfo();
};

module.exports = {getInfo, setInfo};