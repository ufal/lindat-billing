var pgp = require('pg\-promise')();
//var conString = "postgres://dkubon@localhost:5433/lindat-billing-test";
//var conString = "postgres://postgres:12345@localhost:5432/lindat-billing";
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";


// Database connection details;
var connectionDetails = {
    host: 'localhost', // 'localhost' is the default;
    port: 5433, // 5432 is the default;
    //database: 'lindat-billing',
    database: 'lindat-billing-test',
    //user: 'postgres',
    user: 'dkubon',
    //password: '12345'
};

var client = pgp(connectionDetails);
client.connect();

function db () {}

db.prototype.insert = (values) => {
    var cs = new pgp.helpers.ColumnSet(['ip', 'datetime', 'request'], {table: 'logs'});

    // generating a multi-row insert query:
    var query = pgp.helpers.insert(values, cs);
    //=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

    // executing the query:
    client.any(query)
        .then(data => {
            console.log('Inserted', values.length, 'values');
            if (data.length > 0) console.log('Failed to insert: ', data);
        })
        .catch(error => {
            //console.log(error);
            console.log('Insert FAILED');
        });
    }

db.prototype.select = function (what, callback) {
    client.query("SELECT * FROM logs" + what,
        function(err, result)
        {
            if (err)
                callback(err,null);
            else
                callback(null,result.rows);
        /*
    function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Select Successful');
            console.log(result.rows);
            callback(result.rows);
            //return result;
        }*/
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