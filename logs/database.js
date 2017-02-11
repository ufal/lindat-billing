var pg = require('pg');
var conString =  "postgres://postgres:12345@localhost:5432/lindat-billing";
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";

var client = new pg.Client(conString);
client.connect();

function db () {}
/*
var update = function () {
    console.log(Date());
}

setInterval(function() {
    var date = new Date();
    if ( date.getSeconds() === 0 ) {
        update();
    }
}, 1000);
*/
//insert("195.113.20.155", "[08/Mar/2016:14:48:43 +0100]", 'GET /Shibboleth.sso/DiscoFeed HTTP/1.1" 200 389353 "-" "Java/1.8.0_45');
db.prototype.insert = function (address, date, request) {
    client.query("INSERT INTO logs(ip, datetime, request) values($1, $2, $3)",
        [address,date,request],
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Insert Successful');
            }
        });
    }

db.prototype.select = function (what) {
    client.query("SELECT * FROM logs" + what,
    function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Select Successful');
            return result;
        }
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