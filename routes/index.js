var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/textanalytics', function (req, res, next) {
    console.log(req.body.text);
    var content = {
        "DocumentText" : req.body.text,
        "IsTwitterContent" : false,
        "UserCategoryModelName" : "MyTrainedModel",
        "PrivateKey" : "",
        "Secret" : "infomagic"
    };

    var options = {
        url : 'http://api.text2data.org/root',
        method : "POST",
        body: JSON.stringify(content)
    };
    
    var callback = function (err, data){
        console.log(err);
        console.log(data.body);
        res.status(200).send(data.body);
    }

    request(options, callback);
});

module.exports = router;
