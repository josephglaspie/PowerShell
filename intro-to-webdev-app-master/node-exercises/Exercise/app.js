var express = require('express');
var app = express();

app.get('/cheer.txt', function(req, res){
  res.send("That shirt doesn't look awful on you.");
});

app.get('/jeer.txt', function(req, res){
  res.send("BBOOOOOOMMM  !!I'm pretty sure your scent is unpleasant.");
});

var server = app.listen(8080, function() {
	console.log('Listening on port 8080');
});