var express = require('express');
var app = express();
var dbtools = require('./db.js');
var Snippet = require('./snippet.js');

app.set('port', (process.env.PORT || 5000));

app.get('/snippets', function (req, res) {
  if (JSON.stringify(req.query) == '{}') {
    dbtools.getAll(function(data) {
      res.send(JSON.stringify(data));
    });
  }
  else {
    res.send('GET request with query: ' + JSON.stringify(req.query));
  }
});

app.post('/snippets', function (req, res) {
  res.send('POST request to the homepage');
});

app.get('/snippets/:id', function (req, res) {
  dbtools.getWithId(req.params.id ,function(data) {
    res.send(JSON.stringify(data));
  });
});

app.put('/snippets/:id', function (req, res) {
  res.send('PUT request to the id: ' + req.params.id);
});

app.delete('/snippets/:id', function (req, res) {
  dbtools.deleteWithId(req.params.id ,function() {
    res.send('Snippet was successfully deleted');
  });
});


app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
