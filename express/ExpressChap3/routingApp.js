var express = require("express");
var path = require("path");
var http = require("http");

var app = express();

//the server will try this first and pull up any static htmls, else it will do the below
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", function(request, response) {
    response.end("Welcome to my homepage! routingExample");
});

app.get("/about", function(request, response) {
    response.end("Welcom to my about page! routingexample");
});

app.get("/weather", function(request, response) {
    response.end("the current weather is hot and wet!");
});

app.get("/hello/:who", function(request, response) {
    response.end("Hello, " + request.params.who + ".");
});

app.use(function(request, response) {
    response.statusCode = 404;
    response.end("404!");
});

http.createServer(app).listen(3000);