/**
 * Backend setting.
 * Handles environmental variables.
 */
"use strict";

const path = require('path');
const fs = require('fs');

let _this_dir = __dirname;

var settings = {
    "input_dir": path.join(_this_dir, '..', process.env.INPUT_LOGS_PATH || 'input_logs'),

    "db": {
        host: process.env.LB_DB_HOST,
        port: process.env.LB_DB_PORT,
        database: process.env.LB_DB_NAME || "lindat-billing",
        user: process.env.LB_DB_USER,
        password: process.env.LB_DB_PASS
    }
};

// could be made more secure
let secret_file_path = path.join(_this_dir, process.env.SECRETS_FILE_PATH || '');
if (path.extname(secret_file_path) === ".json") {
    if (fs.existsSync(secret_file_path)) {
        console.log("Using secrets from file [%s]", secret_file_path);
        let s = require(secret_file_path);
        settings.db = s;
    }else {
        console.log("Secrets file [%s] does not exist!", secret_file_path);
    }
}


module.exports = settings;
