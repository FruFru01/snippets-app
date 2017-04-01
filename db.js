
var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://xbymfppbdjdsrw:85d6b96e688033d69019955cfabc0f97c34e33f7ff6876b45fb22b95dfe0bd34@ec2-54-75-229-201.eu-west-1.compute.amazonaws.com:5432/d7qbp3jn078an5');
var snippets = require('./snippets.js');

module.exports = {
  testfunction: function() {
    console.log("testfunction");
    db.one('SELECT $1 AS value', 123)
    .then(function (data) {
      return data.value;
    })
    .catch(function (error) {
      return error;
    })
  }
}
