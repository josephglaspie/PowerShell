var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views")); //tells express views are in the views folder
app.set("view engine", "ejs"); //tells views to use the ejs engine

var entries = [];
app.locals.entries = entries;

app.use(logger("dev")); // tells morgan to log every request

app.use(bodyParser.urlencoded({ extended: false })); //populates a variable called req.body if the user iss submitting a form(extended option is required)

app.get("/", function(request, response) {
    response.render("index"); //renders homepage at views/index.ejs
});

app.get("/new-entry", function(request, response) {
    response.render("new-entry"); //renders "new entry" page at views/index.ejs when GET-ing the url
});

app.post("/new-entry", function(request, response) { //defines a route handler when you POST to the "New-entry" url in contrast to a GET
    if (!request.body.title || !request.body.body) { //if user submits for with no title they get a 400 response
        response.status(400).send("Entries must have a title and body.");
        return;
    }
    entries.push({ //adds a new entry to the list of entries
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });
    response.redirect("/"); // redirects to the homepage so you can see the new entry
});

app.use(function(request, response) {
    response.status(404).render("404"); //rendersa  404 page because you're requesting an unknown source
});

http.createServer(app).listen(3000, function() {
    console.log("Guestbook app started on port 3000");
});