var db = require('./lib/db');
var express = require('express');
var app = express(),
		cookieParser = require('cookie-parser'),
		bodyParser = require('body-parser'),
		expressSession = require('express-session'),
		hash = require('bcrypt-nodejs'),
		passport = require('passport'),
		localStrategy = require('passport-local').Strategy;

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));

app.use('/', require('./lib/routes/index'));
app.use('/api/recipe', require('./lib/routes/recipe'));
app.use('/api/ingredient', require('./lib/routes/ingredient'));

// model for users //

var User = require('./lib/models/User.js');

// passport config //
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/login', function(req, res){
  res.render('login.ejs');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/register', function(req, res) {
	res.render('register.ejs')
});

app.use('/fridge', require('./lib/routes/alexa'));

app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on port 3000.');
});
