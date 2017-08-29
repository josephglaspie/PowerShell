var express = require("express");
var fs = require("fs");
var path = require("path");
var morgan = require("morgan"); //logger middleware
var port = 3000;

var app = express();
app.use(morgan("short"));

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(function(req, res) {
    res.status(404);
    res.send("File not found!");
});

app.use(function(er, req, res, next) {
    console.error(err);
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(500);
    res.send("Internal server error");
});

// app.use(function(res, req, next) {
//     console.log("Request IP: " + req.url);
//     console.log("Request Data: " + new Date());
//     next();
// });

// app.use(function(req, res, next) {
//     var filePath = path.join(__dirname, "static", req.url);
//     fs.stat(filePath, function(err, fileInfo) {
//         if (err) {
//             next();
//             return;
//         }
//         if (fileInfo.isFile()) {
//             res.sendFile(filePath);
//         } else {
//             next();
//         }
//     });
// });

// app.use(function(req, res) {
//     res.status(404);
//     res.send("File not found!");
// });

app.listen(port, function() {
    console.log("App started on port: " + port);
});