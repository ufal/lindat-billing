/**
 * Takes care of logs management.
 *  Checks current state of log processing.
 *  Sets watcher on log files.
 *  Processes new logs.
 */
const fs = require('fs');
const tail = require('./tail');
const parser = require('./parser');
const info = require('./log-info');

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
        console.log("Log files present: " + fileNames.length);

        fileNames.forEach(function(filename) {
            console.log(dirName + '/' + filename);
            fs.readFile(dirName + '/' + filename, 'utf-8', (err, content) => {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(dirName + '/' + filename, content);
            });
        });
    });
}

function onError(error) {
    // handle specific listen errors with friendly messages
    console.log(error);
}

function onFileContent(filePath) {
    const filename = filePath.substr(filePath.lastIndexOf('/') + 1);
    let alreadyRead = 0;
    infoFile.data.forEach(function (item) {
        if (item.name == filename) alreadyRead = item.bytesRead;
    });
    // the size of the file in bytes
    const size = fs.statSync(filePath)["size"];
    if (alreadyRead < size) {
        const file = fs.readFileSync(filePath);
        parser(file.toString());
        infoFile.data.push({name: filename, bytesRead: size});
        info.setInfo(infoFile);
    } else {
        console.log('File', filename, 'is up to date');
    }
    tail.tailFile(filePath, fs.statSync(filePath)["size"] - size, size, true, (err, filename, data, unsubscribe) => {
        if (err) {
            console.log(err);
        }});
}

module.exports = readFiles;