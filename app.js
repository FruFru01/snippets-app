var express = require('express');
var app = express();
var dbtools = require('./db.js');
var snippets = require('./snippet.js');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/db', function (req, res) {
  res.send('from db: ' + dbtools.testfunction());
});

app.get('/test', function(req, res) {
  dbtools.testfunction();
  res.send('look at console');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
