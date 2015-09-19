var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

rotuer.get('/textanalytics', function (req, res, next) {
    res.send(200, "Text Analyzed");
});

module.exports = router;
