/**
 *  Tailing of log files handling.
 *      Whenever a watched file is changed, it gets the new data to parser
 */

const fs = require('fs');
const path = require('path');
const parseString = require('./parser').parseString;
const logger = require('winston');
const info = require('./log-info');

/**
 * Return bytesToRead bytes of data from the end of the file and optionally calls the provided callback with the new data
 * as the file is modified and new data is available.
 *
 * @param  {String} filePath Absolute path to a file.
 * @param  {Number} bytesToRead How many bytes from the end of the file to read.
 * @param  {Number} beginning
 * @param  {Boolean} follow If true, the provided callback will be continuously called (until un-subscribed) with the new data
 *                          as the file is modified and new data is available (aka tail -F).
 * @param  {Function} callback Callback which is called with an error as the first argument, data with as the second one
 *                              and the un-subscribe function as the third one.
 */
function tailFile(filePath, bytesToRead, beginning, follow, callback) {
    let stat, watchFileListener;
    const filename = filePath.substr(filePath.lastIndexOf('/')+1);
    infoFile = info.getInfo();

    /**
     * Read a file.
     *
     * @param {Number} start Start offset.
     * @param {Number} end End offset.
     */
    function readFile(start, end) {
        const fileStream = fs.createReadStream(filePath, {start: start, end: end});
        if (start < end) logger.verbose("Reading from ", start, " to ", end);
        fileStream.on('data', function(data) {
            // tady to neco chce vylepsit nejak
            parseString(data);
            infoFile.setSingleInfo(filename, end);
            callback(null, filename, data, unSubscribe);
        });
        fileStream.on('error', function(err) {
            if (follow) {
                unSubscribe();
            }
            callback(err, filename, null, null);
        });
    }

    function unSubscribe() {
        stat.removeListener('change', watchFileListener);

        if (Object.keys(stat._events).length === 0) {
            // No more listeners left, unwatch the file
            fs.unwatchFile(filePath);
            logger.verbose("Stopped watching " + filePath);
        }
    }

    watchFileListener = function(curr, prev) {
        let start, end;

        const inodeCurr = curr.ino;
        const inodePrev = prev.ino;

        const sizeCurr = curr.size;
        const sizePrev = prev.size;
        const sizeDiff = sizeCurr - sizePrev;

        const mTimeCurr = curr.mtime.valueOf();
        const mTimePrev = prev.mtime.valueOf();

        //if ((inodeCurr !== inodePrev) || (sizeDiff < 0) || (sizeDiff === 0 && mTimeCurr !== mTimePrev)) {
        if ((sizeDiff < 0) || (sizeDiff === 0 && mTimeCurr !== mTimePrev)) {
            // Log file was rotated or truncated
            start = 0;
            end = (bytesToRead > sizeCurr) ? sizeCurr : bytesToRead;
        }
        else if (sizeDiff === 0) {
            // No change in the file size (probably file ownership or permissions were changed), ignore this event
            return;
        }
        else {
            start = sizePrev;
            end = sizeCurr;
        }

        readFile(start, end);
    };

    if (follow) {
        logger.verbose("Watching " + filePath);
        stat = fs.watchFile(filePath, watchFileListener);
    }

    fs.stat(filePath, function(err, stats) {
        let start, end;
        if (err) {
            if (follow) {
                unSubscribe();
            }
            callback(err, filename, null, null);
            return;
        }

        //start = (bytesToRead >= stats.size) ? 0 : (stats.size - bytesToRead);
        start = beginning;
        end = stats.size;

        if (end === 0) {
            // Empty file
            callback(null, filename, '', (follow) ? unSubscribe : null);
            return;
        }
        readFile(start, end);
    });
}

exports.tailFile = tailFile;