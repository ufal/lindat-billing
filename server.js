/**
 * Created by David on 14. 1. 2017.
 */

var express = require('express'),
    app = express();

const PORT = 8888;

app.use(express.static(__dirname + '/public'));

app.listen(PORT);