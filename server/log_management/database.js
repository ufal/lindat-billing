var config = require('../../settings/backend');
var pgp = require('pg\-promise')();
var id_s = require('./services.json');

//var conString = "postgres://dkubon@localhost:5433/lindat-billing-test";
//var conString = "postgres://postgres:12345@localhost:5432/lindat-billing";
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";


// Database connection details;
var client = pgp(config.db);
client.connect().catch(error=> {
    console.log('Error connecting to database [%s:%s]:', config.db.host, config.db.port, error);
});

// database constructor
function db () {}

// Retrieves all the data of a user with specified id
getUser = (ip) => {
    console.log("SELECT * FROM users WHERE ip = '" + ip + "'::inet");
    client.any("SELECT * FROM users WHERE ip = '" + ip + "'::inet")
        .then(data => {
            if (data.Length > 0) {
                console.log(data[0].id_u);
                return data[0].id_u;
            }
            else return "";
        })
        .catch(error => {
            console.log(error);
        });
};

// Adds a user with ip and id to the database
addUser = (ip, id) => {
    console.log("INSERT INTO Users VALUES('" + id + "','" + ip + "')");
    client.any("INSERT INTO Users VALUES('" + id + "','" + ip + "')")
        .catch(error => {
            console.log(error);
        });
    console.log("New User:", id);
};

// Insert a new log entry into the database
db.prototype.insert = (values) => {
    // column headers
    var cs = new pgp.helpers.ColumnSet(['id_u', 'id_s', 'datetime', 'request'], {table: 'logs'});
    // getting user ids
    client.any("SELECT * FROM users")
        .then(data => {
            // prepare a table to look up id
            var id_u = {};0
            for(var i = 0; i < data.length; i++){
                id_u[data[i].ip] = data[i].id_u;
            }
            // if the current user is not in the table, add him both into the table and into the database
            for (var i = 0; i < values.length; i++) {
                if ("undefined" === typeof id_u[values[i].ip]) {
                    var idx = Object.keys(id_u).length+1;
                    addUser(values[i].ip, idx);
                    id_u[values[i].ip] = idx;
                }
                // add the found id to the data rows to be inserted
                values[i]['id_u'] = id_u[values[i].ip];

                // looks up service id
                var serviceId = 0;
                if (values[i].isService && "undefined" !== typeof id_s[values[i].service]) {
                    serviceId = id_s[values[i].service];
                }
                values[i]['id_s'] = serviceId;
            }

            // generating a multi-row insert query:
            var query = pgp.helpers.insert(values, cs);
            // vzor: => INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

            // executing the query:
            client.any(query)
                .then(data => {
                    console.log('Inserted', values.length, 'values');
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
                    console.log('Insert FAILED');
                    console.log(error);
                    //reject();
                });
        })
        .catch(error => {
            console.log(error);
        });
};


// Select of a specific IP (what)
db.prototype.select = (what) => {
    return new Promise((resolve, reject) => {
        client.any("SELECT ip, id_s, datetime, request FROM logs l INNER JOIN users u on l.id_u = u.id_u " + what)
            .then(data => {
                console.log("Select succesful", data.length);
                resolve(data);
            })
            .catch(error => {
                console.log('Select FAILED');
                console.log(error);
                reject(error);
            });
    });
};



db.prototype.delete = function () {};


db.prototype.update = function () {};


module.exports = db;
