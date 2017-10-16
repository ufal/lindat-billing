/**
 * Database operations management.
 */

const config = require('../settings/backend');
const pgp = require('pg\-promise')();
const logger = require('./logger');
let id_s = require('./log_management/services.json');

// Database connection details;
let client = pgp(config.db);
client.connect()
    .then(obj => {
        obj.done(); // release the connection
    })
    .catch(error=> {
        logger.error('Error connecting to database [%s:%s]:', config.db.host, config.db.port, error);
});

// database constructor
function DB () {}

// Retrieves all the data of a user with specified id
getUser = (ip) => {
    logger.debug("SELECT * FROM users WHERE ip = '" + ip + "'::inet");
    client.any('SELECT * FROM users WHERE ip = $1::inet', ip)
        .then(data => {
            if (data.length > 0) {
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
    client.any('INSERT INTO Users VALUES($1, $2)', [id, ip])
        .catch(error => {
            logger.error('addUser ERROR for id', id, 'and ip', ip, '\n', error);
        });
    logger.verbose("New User:", id);
};

addLogin = (userID) => {
    client.any('INSERT INTO Logins VALUES($1, $2)', [userID, Date.now()])
        .catch(error => {
            logger.error('addLogin ERROR\n', error);
        });
    logger.verbose("New login from", userID);
};

DB.prototype.getLogins = () => {
    return new Promise((resolve, reject) => {
        logger.debug('SELECT * FROM Logins');
        client.any('SELECT * FROM Logins')
            .then(data => {
                resolve(data.reverse()/*.slice(0,10)*/);
            })
            .catch(error => {
                logger.error(error);
                reject(error);
            });
    });
};

DB.prototype.getMyLogins = (username) => {
    return new Promise((resolve, reject) => {
        logger.debug('SELECT * FROM Logins WHERE username = username');
        client.any('SELECT * FROM Logins WHERE username = $1', username)
            .then(data => {
                resolve(data.reverse()/*.slice(0,10)*/);
            })
            .catch(error => {
                logger.error(error);
                reject(error);
            });
    });
};

// Insert a new log entry into the database
DB.prototype.insert = (values) => {
    // column headers
    const cs = new pgp.helpers.ColumnSet(['id_u', 'id_s', 'datetime', 'request'], {table: 'logs'});
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
                let ip = values[i].ip;
                if ("undefined" === typeof id_u[ip]) {
                    const idx = Object.keys(id_u).length+1;
                    addUser(ip, idx);
                    id_u[ip] = idx;
                }
                // add the found id to the data rows to be inserted
                values[i]['id_u'] = id_u[values[i].ip];

                // looks up service id
                let serviceId = 0;
                let service = values[i].service;
                if ("undefined" !== typeof id_s[service]) {
                    serviceId = id_s[service];
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

DB.prototype.addNewIP = (what) => {
    return new Promise((resolve, reject) => {
        client.any("INSERT INTO Users (ip, owner) VALUES($1, $2)", [what.address, what.username])
            .then(data => {
                logger.info('Adding new IP was successful');
                resolve(data);
            })
            .catch(error => {
                logger.info('Adding new IP FAILED');
                logger.error(error);
                reject(error);
            });
    });
};

DB.prototype.getIPs = (what) => {
    return new Promise((resolve, reject) => {
        client.any(what)
            .then(data => {
                logger.info('Select succesful', data.length);
                resolve(data);
            })
            .catch(error => {
                logger.info('Select FAILED');
                logger.error(error);
                reject(error);
            });
    });
};

DB.prototype.getAllAccounts = () => {
    return new Promise((resolve, reject) => {
        client.any('SELECT * FROM accounts a INNER JOIN users u on a.username = u.owner WHERE a.admin = false')
            .then(data => {
                logger.info('Select succesful', data.length);
                resolve(data);
            })
            .catch(error => {
                logger.info('Select FAILED');
                logger.error(error);
                reject(error);
            });
    });
};

// Select of a specific IP (what)
DB.prototype.select = (what) => {
    return new Promise((resolve, reject) => {
        logger.debug("SELECT ip, id_s, datetime, request FROM logs l INNER JOIN users u on l.id_u = u.id_u " + what);
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

DB.prototype.addAccount = (username, password) => {
    return new Promise((resolve, reject) => {
        client.any("INSERT INTO Accounts (username, pass, admin) " +
            "VALUES($1, crypt($2, gen_salt('bf')), $3)", [username.toLowerCase(), password, false])
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

DB.prototype.authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        client.any('SELECT * from Accounts where username = $1 and pass = crypt($2, pass)',
            [username.toLowerCase(), password])
            .then(data => {
                if (data.length > 0) {
                    addLogin(username.toLowerCase());
                    resolve(data); // data
                }
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


DB.prototype.delete = function () {};


DB.prototype.update = function () {};


DB.prototype.getServiceCount = () => {
    return Object.keys(id_s).length / 2;
};

DB.prototype.getServiceName = (id) => {
    return id_s[id];
};


module.exports = DB;
