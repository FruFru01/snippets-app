
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

  getAll: function(callback) {
    db.any('select * from snippets')
    .then(data => {
      callback(data);
      return true;
    })
    .catch(function (error) {
      return error;
    })
  },

  getWithId: function(id, callback) {
    db.one('select * from snippets where id=$1', [id])
    .then(data => {
      callback(data);
      return true;
    })
    .catch(function (error) {
      return error;
    })
  },

  deleteWithId: function(id, callback) {
    db.none('delete from snippets where id=$1', [id])
    .then(() => {
      callback();
      return true;
    })
    .catch(function (error) {
      return error;
    })
  },

  testinsert: function() {
    db.none("insert into snippets(name, description, author, language, code) values($1, $2, $3, $4, $5)", ['Hello', 'print a value', 'johnny', 'JavaX', 'System.("Hello World");'])
    .then(() => {
        // success;
    })
    .catch(error => {
        console.log('db error: ' + error);
    });
  }
}
