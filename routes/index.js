var express = require('express');
var request = require('request');
var Clarifai = require('./clarifai-nodejs/clarifai_node.js');
// var fbgraph = require('fbgraphapi')
var router = express.Router();
// var fbgraph = require('fbgraphapi');
var passport = require('passport');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res) {
    // if (!req.hasOwnProperty('facebook')) {
    //     console.log('You are not logged in');
    //     return res.redirect('/login');
    // }
    // /* See http://developers.facebook.com/docs/reference/api/ for more */
    // req.facebook.graph('/me', function(err, me) {
    //     console.log(me);
    // });
    
    // req.facebook.graph('/me?fields=id,name', function(err, me) {
    //     console.log(me);
    // });
    
    // req.facebook.me(function(err, me) {
    //     console.log(me);
    // });
    
    // // /me/likes
    // req.facebook.my.likes(function(err, likes) {
    //     console.log(likes);
    // });
    
    // res.end("Check console output");
    res.render('index', { title: 'Express' });
});

router.get('/auth/facebook',
  // passport.authenticate('facebook'),
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    console.log("HERE");
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/auth/facebook/callback', function(req, res) {
    console.log("in callback");
    console.log("session", req.session.user);
    req.session.user = req.query.code;

    res.redirect('/');
});

// router.get('/login', function(req, res) {
//     console.log('Start login');
//     fbgraph.redirectLoginForm(req, res);    
// });

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
