var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

require('./models/truck');


var truck = require('./routes/truckroute');
var mongoose = require('mongoose');                         //add for Mongo support
mongoose.connect('mongodb://localhost:27017/iothubdb');              //connect to Mongo
//mongoose.connect('mongodb://neevsysmgr:mongo2016@ds064188.mlab.com:64188/neevaccountdb');              //connect to Mongo
var app = express();

// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api', truck);


app.listen(7777,function(){
    "Up and running";
    
})

module.exports = app;
