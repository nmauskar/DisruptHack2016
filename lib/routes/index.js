var express = require('express');
var router = express.Router();
var db = require('../db');

router.route('/')
.get(function(req, res) {
	res.render('index.html');
});

module.exports = router;
