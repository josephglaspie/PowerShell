var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

