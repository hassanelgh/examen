var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let moviesF = fs.readFileSync('movies_reduit.json');
  let movies = JSON.parse(moviesF);

  res.json(movies)
});

module.exports = router;
