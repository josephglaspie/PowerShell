//Middleware
var express = require("express");
var app = express();
var http = require('http');
var port = process.env.PORT || 3000;
var logger = require("morgan");
logger("tiny");

//Mail and secrets
var sgMail = require('@sendgrid/mail');
var dotenv = require('dotenv'); //This will load vars from the .env file for secret info like sendGrid data
dotenv.load();
var bodyParser = require('body-parser'); //for parsing the body req.body.WHATEVER
app.use(bodyParser.urlencoded({ extended: false })); //for parsing the body req.body.WHATEVER
app.use(bodyParser.json()); //for parsing the body req.body.WHATEVER
var SECRET_KEY = process.env.SECRET_KEY;
sgMail.setApiKey(SECRET_KEY);

//Ejs, views and bootstrap loading
app.set("view engine", "ejs");
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/img/clients", express.static(__dirname + "/img/clients"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/font-awesome", express.static(__dirname + "/font-awesome"));

//Routing
app.get("/", function(req, res) {
    res.render("pages/index");
});

app.get("/about", function(req, res) {
    res.render("pages/about");
});

app.get('/contact', function(req, res) {
    res.render("pages/contact");
});

app.post('/contact', function(req, res) {
    var msg = {
        to: 'josephglaspie@gmail.com',
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.message,
    };
    sgMail.send(msg); //.then().catch() add this eventually
    res.end("We'll get back with you asap!");
});

app.listen(port);
console.log("listening on Port: " + port + ".");