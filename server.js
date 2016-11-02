var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
app.use(session({secret: "The Secretiest Secret"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('/'+'FacebookViewer'+'/public'));
app.use(bodyParser.urlencoded({extended: false}));

passport.use(new FacebookStrategy({
  clientID: '1008458055946536',
  clientSecret: '02e82e93cbbd9a5cfda40f6c63cf29b8',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  console.log("token", token);
  console.log("refreshToken", refreshToken)
  console.log("profile", profile);
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/me',
    failureRedirect: '/auth/facebook'
}), function (req, res) {
    console.log(req.session);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res){
  res.send(req.user);
});


app.listen(3000, function(){
  console.log("We have ears");
});