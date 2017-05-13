var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser');
  mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

var app = express();

function compile(str, path){
  return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}
));
app.use(express.static(__dirname + '/public'));

//multivision is the name of the db that will be created and Appname of this project
if(env === 'developement'){
  mongoose.connect('mongodb://localhost/multivision');
} else {
  mongoose.connect('mongodb://joseph:passw0rd@ds163010.mlab.com:63010/multivision')
}
//mongoose.connect('mongodb://localhost/multivision')
//mongoose.connect('mongodb://joseph:passw0rd@ds163010.mlab.com:63010/multivision')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
  console.log('multivision db opened');
});

app.get('/partials/:partialPath', function(req, res){
  res.render('partials/' + req.params.partialPath)
})

app.get('*', function(req, res){
  res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
