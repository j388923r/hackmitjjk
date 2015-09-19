var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/textanalytics', function (req, res, next) {
    res.status(200).send("Text Analyzed");
    
    var options = {
        url : 'https://api.datamarket.azure.com/data.ashx/amla/text-analytics/v1/GetKeyPhrases?Text=hello+world',
        headers : {
            'Accept': 'application/json', 
            'Authorization': 'Basic AccountKey:AvKYKc+kNtCLSyX3BJxYuLFpc/lrOCpKV7MujKRucnw'
        }, 
        body: "Scientific Method Steps \n The exact number of steps to the scientific method depends on how you break up the steps, but here is an overview of the basics: \n 1. Make observations. \n 2. Propose a hypothesis. \n 3. Design and perform an experiment to test the hypothesis. \n 4. Analyze your data to determine whether to accept or reject the hypothesis. \n 5. If necessary, propose and test a new hypothesis. \n If you are having trouble designing an experiment or even getting an idea for a project, start with the first step of the scientific method: make observations."
    };
    
    var callback = function (data){
        console.log(data);
    }

    request.get(options, callback);
});

module.exports = router;
