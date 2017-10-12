/**
 * Checks the validity of an IP address.
 * @param {string} ipAddress - The IP address to be checked.
 * @returns {boolean} - Returns true if it is valid.
 */
function validateIPaddress(ipAddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
        return (true);
    }
    return (false);
}

function validateLogLine(line) {
    let arr = line.split(' ');
    if (!validateIPaddress(arr[0])) return false;
    if (!validateDateTime(arr[3].substring(1) + arr[4].substring(0,arr[4].length-1))) return false;
    return true;
}

function validateDateTime(datetime) {
    //TODO finish this up, possibly with 'moment.js'
    return true;
}

module.exports = {
    validateIPaddress,
    validateLogLine
};