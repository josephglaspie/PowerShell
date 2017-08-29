var http = require("http");
var express = require("express");
var path = require("path");

var app = express();

//tells the server to use views found in the dir call views, npm install ejs --save
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(request, response) {
    response.render("index", {
        message: "Hey, I'm using EJS interpolation!!"
    });
});

http.createServer(app).listen(3000);