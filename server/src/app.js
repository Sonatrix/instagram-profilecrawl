var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var csv = require('csv-express');

// configure db
require('./config/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialise routes
require('./routes')(app);

var port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);

server.listen(port, function(error, res) {
    if (error) {
        console.log("Error while starting server");
    }
     console.log(`Server is listening on port ${port}`)
})

// initialise cron jobs
require('./services');
