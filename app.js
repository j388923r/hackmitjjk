var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

// var fbgraph = require('fbgraphapi');
var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var FACEBOOK_APP_ID = '684091941642845';
var FACEBOOK_APP_SECRET = '4aa72fc93d6fc6d8269b2aaf63522ec3';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "SECRET"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// app.use(fbgraph.auth( {
//         appId : fb_app_id,
//         appSecret : fb_secret,
//         redirectUri : "http://hackmitjjk.azurewebsites.net",
//         // redirectUri : "http://localhost:3000",
//         apiVersion: "v2.2"
//     }));
passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    // console.log(done(null,null));
    console.log(profile);
    return;
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//process.env.azureml_key || "AvKYKc+kNtCLSyX3BJxYuLFpc/lrOCpKV7MujKRucnw"

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
