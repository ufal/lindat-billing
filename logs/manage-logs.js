var fs = require('fs');
var tail = require('./tail');
var jsonName = './log-files.json';
var info = require(jsonName);

function readInfo() {
    /*var fs = require('fs');
    var obj;
    fs.readFile('file', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
    });*/
}

function readFiles(dirname, fileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            console.log(dirname + '/' + filename);
            fs.readFile(dirname + '/' + filename, 'utf-8', function(err, content) {
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

function onFileContent(filePath, content) {
    filename = filePath.substr(filePath.lastIndexOf('/')+1);
    var alreadyRead = info[filename];
    if (typeof alreadyRead == 'undefined') {
        alreadyRead = 0;
        info[filename] = 0;
    }
    var size = getFilesizeInBytes(filePath);
    tail.tailFile(filePath, size - alreadyRead, true, null);
    info[filename] = size;
    if (alreadyRead < size) write()
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes
}

function write() {
    fs.writeFile('./logs/' + jsonName, JSON.stringify(info), function (err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(info));
        //console.log('writing to ' + jsonName);
    });
}

module.exports = readFiles;