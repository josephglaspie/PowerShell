var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/clubreq', function(res, req) {
    res.render('pages/clubreq');
});

app.listen(8080);
console.log('http://127.0.0.1:8080');