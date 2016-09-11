var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/User.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

router.route('/')
.get(function(req, res) {
	res.render('index.ejs');
});

router.route('/register')
.get(function(req, res) {
	res.render('register.ejs');
})
.post(function(req, res) {
	User.register(
		new User({ username: req.body.username, alexaID: '', code: Math.round(Math.random() * 999999 + 100000) }),
		req.body.password,
		function(err, account) {
			if (err) {
				return res.status(500).json({ err: err.message || err.toString() });
			}

			passport.authenticate('local')(req, res, function() {
				return res.status(200).json({ status: 'Registration successful!' });
			});
		}
	);
});

router.route('/registerAlexa')
.get(function(req, res) {
	res.render('registerAlexa.ejs', { user: req.user });
});

router.route('/login')
.post(function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res.status(401).json({ err: info });
		}

		req.logIn(user, function(err) {
			if (err) {
				return res.status(500).json({ err: 'Could not log in user' });
			}

			res.status(200).json({ status: 'Login successful!' });
		});
	})(req, res, next);
});

router.get('/status', function(req, res) {
	if (!req.isAuthenticated()) {
		return res.status(200).json({ status: false });
	}

	res.status(200).json({ status: true });
});

router.route('/login')
.get(function(req, res){
	res.render('login.ejs');
})
.post(passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
	res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;
