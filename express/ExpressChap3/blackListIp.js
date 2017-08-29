var http = require("http");
var express = require("express");
var app = express();

var EVIL_IP = "123.45.67.89";

app.use(function(request, response, next) {
    if (request.ip === EVIL_IP) {
        response.status(401).send("NOT ALLOWED!");
    } else {
        response.end("You are not evil IP: " + request.ip);
    }

});

http.createServer(app).listen(3000);