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
    if(req.query.id != null) {
      dbtools.getWithAttribute({'key':'id', 'value':req.query.id}, function(data) {
        res.send(JSON.stringify(data));
      });
      //res.send('GET request with query: ' + req.query.id);
    } else if (req.query.name != null){
      res.send('GET request with query: ' + req.query.name);
    } else if (req.query.description != null){
      res.send('GET request with query: ' + req.query.description);
    } else if (req.query.author != null){
      res.send('GET request with query: ' + req.query.author);
    } else if (req.query.language != null){
      res.send('GET request with query: ' + req.query.language);
    } else if (req.query.code != null){
      res.send('GET request with query: ' + req.query.code);
    } else if (req.query.text != null){
      res.send('GET request with query: ' + req.query.text);
    } else {
      res.send('No such Attribute!');
    }
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
