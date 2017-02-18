var fs = require('fs');
var tail = require('./tail');
var jsonName = './log-files.json';
var info = require(jsonName);
var parser = require('./parser');

var blocLimit = 700;

function readFiles(dirname, fileContent, onError) {
    fs.readdir(dirname, (err, filenames) => {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            console.log(dirname + '/' + filename);
            fs.readFile(dirname + '/' + filename, 'utf-8', (err, content) => {
                if (err) {
                    //onError(err);
                    return;
                }
                onFileContent(dirname + '/' + filename, content);
            });
        });
    });
}

function onError() {}

function onFileContent(filePath) {
    filename = filePath.substr(filePath.lastIndexOf('/') + 1);
    var alreadyRead = info[filename];
    if (typeof alreadyRead == 'undefined') {
        alreadyRead = 0;
        info[filename] = 0;
    }
    // the size of the file in bytes
    var size = fs.statSync(filePath)["size"];

    recursiveAdd(filePath, alreadyRead, size)
        .then(() => {
            info[filename] = size;
            write();
            tail.tailFile(filePath, fs.statSync(filePath)["size"] - size, size, true, (err, filename, data, unsubscribe) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

function recursiveAdd(filePath, alreadyRead, size) {
    return new Promise((resolve, reject) => {
        var end = (size - alreadyRead > blocLimit) ? alreadyRead + blocLimit : size;
        var fileStream = fs.createReadStream(filePath, {start: alreadyRead, end: end});
        console.log("reading from ", alreadyRead, " to ", end);
        fileStream.on('data', (data) => {
            parser(data)
                .then((lastLineLength) => {
                    info[filename] = alreadyRead + blocLimit - lastLineLength + 1;
                    alreadyRead += blocLimit - lastLineLength + 1;
                    if (alreadyRead < size) {
                        recursiveAdd(filePath, alreadyRead, size)
                            .then(() => {
                                resolve();
                            })
                            .catch((err) => {
                                console.log(err);
                                reject(err);
                            })
                    } else {
                        resolve();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    });
}

function write() {
    fs.writeFile('./logs/' + jsonName, JSON.stringify(info), (err) => {
        if (err) return console.log(err);
        //console.log(JSON.stringify(info));
        console.log('writing', info, 'to', jsonName);
    });
}

module.exports = readFiles;