var express = require('express'),
  app = express(),
  path = require('path'),
  passport = require('passport'),
  passportLocal = require('passport-local'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  mongoose = require("mongoose"),
  localStrategy = require('passport-local').Strategy;


//mongoose
mongoose.connect("mongodb://administrator:admin@ds021969.mlab.com:21969/maxes-users");

//User  and Poll schema
var User = require(path.resolve(__dirname, 'models/schema.js'));
var Poll = require(path.resolve(__dirname, 'models/polls.js'));


//Register Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



//configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app routes
app.use(express.static(path.resolve(__dirname, 'client')));

app.post('/login', function(req, res) {
  require(path.resolve(__dirname, 'route_modules/authentication/login.js'))(passport, req, res);
});

app.post('/register', function(req, res) {
  require(path.resolve(__dirname, 'route_modules/authentication/register.js'))(User, passport, req, res);
});

app.get('/status', function(req, res) {
  require(path.resolve(__dirname, 'route_modules/authentication/status.js'))(req, res);
});

app.get('/logout', function(req, res) {
 require(path.resolve(__dirname, 'route_modules/authentication/logout.js'))(req, res);
});

app.get('/polls', function(req, res) {
  require(path.resolve(__dirname, 'route_modules/api/polls.js'))(Poll, req, res);
});
app.get('/charts/:id', function(req, res) {

require(path.resolve(__dirname, 'route_modules/api/chartGet.js'))(Poll, req, res)

  
});

app.put('/charts/:id', function(req, res) {
require(path.resolve(__dirname, 'route_modules/api/chartPut.js'))(Poll, req, res);
});

app.delete('/charts/:id', function(req, res){
  require(path.resolve(__dirname, 'route_modules/api/chartDelete.js'))(Poll, req, res);
});

app.post('/newPoll', function(req, res) {

  require(path.resolve(__dirname, 'route_modules/api/newPollPost.js'))(Poll, req, res);
});

app.get('/user', function(req, res){
 require(path.resolve(__dirname, 'route_modules/api/user.js'))(Poll, req, res);
});



//where the server is listening
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
