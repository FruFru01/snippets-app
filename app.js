var express = require('express');
var app = express();
var dbtools = require('./db.js');
var Snippet = require('./snippet.js');

app.get('/snippets', function (req, res) {
  console.log("test" + {});
  if (Object.is(req.query, {})) {
    res.send('GET request to the homepage');
  }
  else {
    res.send('GET request with query: ' + req.query);
  }
});

app.post('/snippets', function (req, res) {
  res.send('POST request to the homepage');
});

app.get('/snippets/:id', function (req, res) {
  res.send('GET request to the id: ' + req.params.id);
});

app.put('/snippets/:id', function (req, res) {
  res.send('PUT request to the id: ' + req.params.id);
});

app.delete('/snippets/:id', function (req, res) {
  res.send('DELETE request to the id: ' + req.params.id);
});


app.get('/', function (req, res) {
  var snip = new Snippet("1", "2", "3", "4", "5", "6");
  console.log(snip.getJson());
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
