var db = require('./lib/db');

var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var hash = require('bcrypt-nodejs');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// passport config //
passport.use(new localStrategy(db.user.authenticate()));
passport.serializeUser(db.user.serializeUser());
passport.deserializeUser(db.user.deserializeUser());

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));

app.use('/', require('./lib/routes/index'));
app.use('/api/recipe', require('./lib/routes/recipe'));
app.use('/api/ingredient', require('./lib/routes/ingredient'));
app.use('/fridge', require('./lib/routes/alexa'));

app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on port 3000.');
});
