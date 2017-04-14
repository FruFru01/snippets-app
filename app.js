var express = require('express');
var app = express();
var dbtools = require('./db.js');
var Snippet = require('./snippet.js');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/snippets', function (req, res) {
  if (JSON.stringify(req.query) == '{}') {
    dbtools.getAll(function(data) {
      res.send(JSON.stringify(data));
    });
  }
  else {
    console.log(req.query.name);
    var snippet = new Snippet(req.query.name, req.query.description, req.query.author, req.query.language, req.query.code, req.query.tags, req.query.id);
    dbtools.getWithAttribute(snippet, function(data) {
      res.send(JSON.stringify(data));
    });
  }
});

app.post('/snippets', function (req, res) {
  //ToDo: InputValidation
  var newSnippet = new Snippet(req.body.name, req.body.description, req.body.author, req.body.language, req.body.code, req.body.tags);
  dbtools.addSnippet(newSnippet, function(data) {
    res.send(JSON.stringify(data));
  });
});

app.get('/snippets/:id', function (req, res) {
  dbtools.getWithId(req.params.id ,function(data) {
    res.send(JSON.stringify(data));
  });
});

app.put('/snippets/:id', function (req, res) {
  var snippet = new Snippet(req.body.name, req.body.description, req.body.author, req.body.language, req.body.code, req.body.tags, req.params.id);
  dbtools.putWithId(snippet, function(data) {
    res.send('Snippet was successfully updated');
  });
});

app.delete('/snippets/:id', function (req, res) {
  dbtools.deleteWithId(req.params.id ,function() {
    res.send('Snippet was successfully deleted');
  });
});


app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
