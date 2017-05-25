/***
|____database
| |____employees.json
|____index.js
|____lib
|____node_modules
| |____colors
|____package.json
|____public
| |____home.html
| |____style.css

***/

var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');

http.createServer(function(req, res) {
    // A parsed url to work with in case there are parameters
    var _url;

    // In case the client uses lower case for methods.
    req.method = req.method.toUpperCase();
    console.log(req.method + ' ' + req.url);

    if (req.method !== 'GET') {
        res.writeHead(501, {
            'Content-Type': 'text/plain'
        });
        return res.end(req.method + ' is not implemented by this server.');
    }

    if (_url = /^\/employees$/i.exec(req.url)) {
        // return a list of employees
        employeeService.getEmployees(function(error, data) {
            if (error) {
                return responder.send500(error, res);
            }
            return responder.sendJson(data, res);
            //send data with a 200 status code
        });

    } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
        // find the employee by the id in the route
        employeeService.getEmployee(_url[1], function(error, data) {
            if (error) {
                return responder.send500(error, res);
            }

            if (!data) {
                return responder.send404(res);
            }
            return responder.sendJson(data, res);
        });
    } else {


        // res.end('static file');
        console.log('url', req.url);
        staticFile(req.url, res);

    }
}).listen(1337, '127.0.0.1');

console.log(' Server is listening on http://127.0.0.1:1337 at ' + __filename);