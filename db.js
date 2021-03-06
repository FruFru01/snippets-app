
var pgp = require('pg-promise')(/*options*/);
var cn = {
    host: 'ec2-54-75-229-201.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd7qbp3jn078an5',
    user: 'xbymfppbdjdsrw',
    password: '85d6b96e688033d69019955cfabc0f97c34e33f7ff6876b45fb22b95dfe0bd34',
    ssl: true
}
//var db = pgp('postgres://xbymfppbdjdsrw:85d6b96e688033d69019955cfabc0f97c34e33f7ff6876b45fb22b95dfe0bd34@ec2-54-75-229-201.eu-west-1.compute.amazonaws.com:5432/d7qbp3jn078an5');
var db = pgp(cn);
var Snippet = require('./snippet.js');

module.exports = {

  getAll: function(callback, error, res) {
    db.any('select * from snippets')
    .then(data => {
      callback(data);
      return true;
    })
    .catch(function (errorMsg) {
      error(res, 400, "something went wrong");
      return errorMsg;
    })
  },

  addSnippet: function(snippet, callback, error, res) {
    db.one('insert into snippets(name, description, author, language, code, tags) values($1, $2, $3, $4, $5, $6) returning id',
      [snippet.name, snippet.description, snippet.author, snippet.language, snippet.code, snippet.tags])
      .then(data => {
        callback(data);
        return true;
      })
      .catch(errorMsg => {
        error(res, 400, "something went wrong");
        return errorMsg;
      });
  },

  getWithAttribute: function(snippet, callback, error, res) {
    if (snippet.name == null)
      snippet.name = '%';
    if (snippet.description == null)
      snippet.description = '%';
    if (snippet.author == null)
      snippet.author = '%';
    if (snippet.language == null)
      snippet.language = '%';
    if (snippet.code == null)
      snippet.code = '%';
    db.any('select * from snippets where (($1 IS NULL) OR (ID = $1)) and name like $2 \
        and description like $3 and author like $4 and language like $5 \
        and code like $6 and (($7 IS NULL) OR (tags @> array[$7]))',
        [snippet.id, snippet.name, snippet.description, snippet.author, snippet.language, snippet.code, snippet.tags])
      .then(data => {
        callback(data);
        return true;
      })
      .catch(errorMsg => {
        error(res, 400, "something went wrong");
        return errorMsg;
      });
  },

  getWithId: function(id, callback, error, res) {
    db.one('select * from snippets where id=$1', [id])
    .then(data => {
      callback(data);
      return true;
    })
    .catch(function (errorMsg) {
      error(res, 400, "something went wrong");
      return errorMsg;
    })
  },

  deleteWithId: function(id, callback, error, res) {
    db.none('delete from snippets where id=$1', [id])
    .then(() => {
      callback();
      return true;
    })
    .catch(function (errorMsg) {
      error(res, 400, "something went wrong");
      return errorMsg;
    })
  },

  putWithId: function(snippetOrig, callback, error, res) {
     var updateCallback = function(snippet) {
        if (snippetOrig.name != null)
          snippet.name = snippetOrig.name;
        if (snippetOrig.description != null)
          snippet.description = snippetOrig.description;
        if (snippetOrig.author != null)
          snippet.author = snippetOrig.author;
        if (snippetOrig.language != null)
          snippet.language = snippetOrig.language;
        if (snippetOrig.code != null)
          snippet.code = snippetOrig.code;
        if (snippetOrig.tags != null)
          snippet.tags = snippetOrig.tags;
        console.log(JSON.stringify(snippet));
        db.none('update snippets set name=$1, description=$2, author=$3, \
          language=$4, code=$5, tags=$6 where id=$7',
          [snippet.name, snippet.description, snippet.author, snippet.language, snippet.code, snippet.tags, snippet.id])
        .then(() => {
          callback();
          return true;
        })
        .catch(function (error) {
          error(res, 400, "something went wrong");
          return error;
        })
     }

    db.one('select * from snippets where id=$1', [snippetOrig.id])
    .then(data => {
      updateCallback(data);
      return true;
    })
    .catch(function (errorMsg) {
      error(res, 400, "something went wrong, " + errorMsg);
      return errorMsg;
    })
  }
}
