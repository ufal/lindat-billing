var pgp = require('pg\-promise')();
//var conString = "postgres://dkubon@localhost:5433/lindat-billing-test";
//var conString = "postgres://postgres:12345@localhost:5432/lindat-billing";
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";


// Database connection details;
var connectionDetails = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

var client = pgp(connectionDetails);
client.connect()
    .catch((err) => {
        console.log(err);
    });

function db () {}

db.prototype.insert = (values) => {
    var cs = new pgp.helpers.ColumnSet(['ip', 'datetime', 'service', 'request'], {table: 'logs'});

    // generating a multi-row insert query:
    var query = pgp.helpers.insert(values, cs);
    //=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

    // executing the query:
    client.any(query)
        .then(data => {
            console.log('Inserted', values.length, 'values');
            if (data.length > 0) console.log('Failed to insert: ', data);
            //resolve();
        })
        .catch(error => {
            //console.log(error);
            console.log('Insert FAILED');
            console.log(error);
            //reject();
        });
    }

db.prototype.select = (what) => {
    return new Promise((resolve, reject) => {
        client.any("SELECT * FROM logs" + what)
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
}

db.prototype.delete = function () {}

//client.query("DELETE from logs WHERE id < 3");


db.prototype.update = function () {

}

/*
query.on('row', function(row) {
    console.log(row);
});

//fired after last row is emitted
query.on('end', function() {
    client.end();
});
*/

module.exports = db;