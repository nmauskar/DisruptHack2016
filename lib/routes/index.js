var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/User.js');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

router.route('/')
.get(function(req, res) {
	res.render('index.ejs');
});



router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, alexaID: req.body.alexaID }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err.stack || err.message || err.toString()
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.redirect('/');
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function(req, res){
  res.render('login.ejs');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

module.exports = router;
