//This app will load .env info like secrect keys from the .env File. You can 
//also fill out forms here, good template for contact us forms
var sgMail = require('@sendgrid/mail');
var http = require('http');
var express = require('express');
var app = express();
var dotenv = require('dotenv'); //This will load vars from the .env file for secret info like sendGrid data
dotenv.load();
var bodyParser = require('body-parser'); //for parsing the body req.body.WHATEVER
app.use(bodyParser.urlencoded({ extended: false })); //for parsing the body req.body.WHATEVER
app.use(bodyParser.json()); //for parsing the body req.body.WHATEVER
var SECRET_KEY = process.env.SECRET_KEY;
sgMail.setApiKey(SECRET_KEY);

var port = process.env.port || 3000;



app.get('/', function(req, res) {
    res.sendfile('./index.html');
});

app.post("/", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.send("the username and password u posted are: " + username + " & " + password);
});

app.get('/contact', function(req, res) {
    res.sendfile('./contact.html');
});

app.post("/contact", function(req, res) {

    var msg = {
        to: 'josephglaspie@gmail.com',
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.message,
        //html: '<strong>and easy to do anywhere, even with Node.js</strong>',

    };
    sgMail.send(msg).then().catch();
    res.end("We'll get back with you ASAP!");
});


app.get("/form", function(req, res) {
    res.sendfile("./form.html"); //sending file to client browser
});

app.post("/form", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.send("the username and password u posted are: " + username + " & " + password);
});

app.listen(port, function() {
    console.log('runing on port: ' + port + " Secret variable " + process.env.TESTVAR);
});