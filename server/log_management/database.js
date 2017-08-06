/**
 * Database operations management.
 */

const config = require('../../settings/backend');
const pgp = require('pg\-promise')();
const logger = require('winston');
let id_s = require('./services.json');
const tools = require('../tools');

// Database connection details;
let client = pgp(config.db);
client.connect().catch(error=> {
    logger.error('Error connecting to database [%s:%s]:', config.db.host, config.db.port, error);
});

// database constructor
function db () {}

// Retrieves all the data of a user with specified id
getUser = (ip) => {
    logger.debug("SELECT * FROM users WHERE ip = '" + ip + "'::inet");
    client.any("SELECT * FROM users WHERE ip = '" + ip + "'::inet")
        .then(data => {
            if (data.Length > 0) {
                return data[0].id_u;
            }
            else return "";
        })
        .catch(error => {
            logger.error(error);
        });
};

// Adds a user with ip and id to the database
addUser = (ip, id) => {
    logger.debug("INSERT INTO Users VALUES('" + id + "','" + ip + "')");
    client.any("INSERT INTO Users VALUES('" + id + "','" + ip + "')")
        .catch(error => {
            logger.error(error);
        });
    logger.verbose("New User:", id);
};

// Insert a new log entry into the database
db.prototype.insert = (values) => {
    // column headers
    var cs = new pgp.helpers.ColumnSet(['id_u', 'id_s', 'datetime', 'request'], {table: 'logs'});
    // getting user ids
    client.any("SELECT * FROM users")
        .then(data => {
            // prepare a table to look up id
            let id_u = {};
            for(let i = 0; i < data.length; i++){
                id_u[data[i].ip] = data[i].id_u;
            }
            // if the current user is not in the table, add him both into the table and into the database
            for (let i = 0; i < values.length; i++) {
                if ("undefined" === typeof id_u[values[i].ip]) {
                    const idx = Object.keys(id_u).length+1;
                    addUser(values[i].ip, idx);
                    id_u[values[i].ip] = idx;
                }
                // add the found id to the data rows to be inserted
                values[i]['id_u'] = id_u[values[i].ip];

                // looks up service id
                let serviceId = 0;
                if (values[i].isService && "undefined" !== typeof id_s[values[i].service]) {
                    serviceId = id_s[values[i].service];
                }
                values[i]['id_s'] = serviceId;
            }

            // generating a multi-row insert query:
            let query = pgp.helpers.insert(values, cs);
            // vzor: => INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

            // executing the query:
            client.any(query)
                .then(data => {
                    logger.info('Inserted', values.length, 'values');
                    if (data.length > 0) console.log('Failed to insert: ', data);
                    //TODO dk: checking if there's no overusage of services
                    /*else {
                     check() // however this method doesnt work
                     .then(data=> {
                     console.log(data);
                     // data[0] = result from the first query;
                     // data[1] = result from the second query;
                     })
                     .catch(error => {
                     console.log(error);
                     });
                     }*/
                    //resolve();
                })
                .catch(error => {
                    //console.log(error);
                    logger.info('Insert FAILED');
                    logger.error(error);
                    //reject();
                });
        })
        .catch(error => {
            logger.error(error);
        });
};


// Select of a specific IP (what)
db.prototype.select = (what) => {
    return new Promise((resolve, reject) => {
        client.any("SELECT ip, id_s, datetime, request FROM logs l INNER JOIN users u on l.id_u = u.id_u " + what)
            .then(data => {
                logger.info("Select succesful", data.length);
                resolve(data);
            })
            .catch(error => {
                logger.info('Select FAILED');
                logger.error(error);
                reject(error);
            });
    });
};

db.prototype.addAccount = (username, password) => {
    return new Promise((resolve, reject) => {
        client.any("INSERT INTO Accounts (username, pass, admin) " +
            "VALUES('" + username.toLowerCase() + "',crypt('" + password + "',  gen_salt('bf')), False)")
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                logger.error(error);
                reject({
                    state: 'failure',
                    reason: 'Username already exists',
                    extra: null
                });
            });
    });
}

db.prototype.authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        client.any("SELECT * from Accounts where username = '" + username.toLowerCase() + "' and pass = crypt('" + password + "', pass)")
            .then(data => {
                if (data.length > 0) resolve(data); // data
                else reject({
                    state: 'failure',
                    reason: 'Invalid username or password',
                    extra: null
                    });
            })
            .catch(error => {
                logger.error(error);
                reject({
                    state: 'failure',
                    reason: 'Database error',
                    extra: error
                });
            });
    });
};


db.prototype.delete = function () {};


db.prototype.update = function () {};


db.prototype.getServiceCount = () => {
    return Object.keys(id_s).length / 2;
};

db.prototype.getServiceName = (id) => {
    return id_s[id];
};


module.exports = db;
