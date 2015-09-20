var express = require('express');
var request = require('request');
var Clarifai = require('./clarifai-nodejs/clarifai_node.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/textanalytics', function (req, res, next) {
    var content = {
        "DocumentText" : req.body.text,
        "IsTwitterContent" : false,
        "UserCategoryModelName" : "MyTrainedModel",
        "PrivateKey" : "21D37DCD-582D-4391-8C61-4ED3CF9899BE",
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
        res.status(200).send("Text Analyzed");
    }

    request(options, callback);
});


//Clarifai stuff
var CLIENT_ID = "_emnlpbMpvUbpXjRUZUbal7ia0wbworG7KuGJbzb";
var CLIENT_SECRET = "P_TsClfyYlkQ3_zeG0QJXHlrq6HH341lXMtzqt0x"
Clarifai.initAPI(CLIENT_ID, CLIENT_SECRET);

Clarifai.setThrottleHandler( function( bThrottled, waitSeconds ) { 
    console.log( bThrottled ? ["throttled. service available again in",waitSeconds,"seconds"].join(' ') : "not throttled");
});

function exampleTagSingleURL() {
    var testImageURL = 'https://upload.wikimedia.org/wikipedia/commons/0/05/MIT_Building_10_and_the_Great_Dome,_Cambridge_MA.jpg';
    var ourId = "train station 1"; // this is any string that identifies the image to your system

    // Clarifai.setRequestTimeout( 100 ); // in ms - expect: force a timeout response
    // Clarifai.setRequestTimeout( 100 ); // in ms - expect: ensure no timeout 
    Clarifai.tagURL( testImageURL , ourId, commonResultHandler );
}




router.post('/clarifai', function (req, response, next){
    function commonResultHandler( err, res ) {
        if( err != null ) {
            if( typeof err["status_code"] === "string" && err["status_code"] === "TIMEOUT") {
                console.log("TAG request timed out");
            }
            else if( typeof err["status_code"] === "string" && err["status_code"] === "ALL_ERROR") {
                console.log("TAG request received ALL_ERROR. Contact Clarifai support if it continues.");               
            }
            else if( typeof err["status_code"] === "string" && err["status_code"] === "TOKEN_FAILURE") {
                console.log("TAG request received TOKEN_FAILURE. Contact Clarifai support if it continues.");               
            }
            else if( typeof err["status_code"] === "string" && err["status_code"] === "ERROR_THROTTLED") {
                console.log("Clarifai host is throttling this application.");               
            }
            else {
                console.log("TAG request encountered an unexpected error: ");
                console.log(err);               
            }
        }
        else {
            console.log(err);
            // if( opts["print-results"] ) {
                // if some images were successfully tagged and some encountered errors,
                // the status_code PARTIAL_ERROR is returned. In this case, we inspect the
                // status_code entry in each element of res["results"] to evaluate the individual
                // successes and errors. if res["status_code"] === "OK" then all images were 
                // successfully tagged.
                if( typeof res["status_code"] === "string" && 
                    ( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {

                    // the request completed successfully
                    var results = [];
                    for( i = 0; i < res.results.length; i++ ) {
                        if( res["results"][i]["status_code"] === "OK" ) {
                            results.push(res["results"][i].result["tag"]["classes"])
                        }
                    }

                    response.status(200).send(results);
                }
            }
        }

        var testImageURL = req.body.text;
        var ourId = "Killian Court"; // this is any string that identifies the image to your system

        // Clarifai.setRequestTimeout( 100 ); // in ms - expect: force a timeout response
        // Clarifai.setRequestTimeout( 100 ); // in ms - expect: ensure no timeout 
        Clarifai.tagURL( testImageURL , ourId, commonResultHandler);


})

module.exports = router;
