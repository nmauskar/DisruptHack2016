var db = require('../db');
var async = require('async');

var registerAlexa = function registerAlexa(alexaID, code, cb) {
	return db.users.findOne({ code: +code }).exec(function(err, user) {
		if (err) {
			return cb(err, null);
		}

		if (!user) {
			return cb(new Error('Could not find user with code "' + code + '"'), null);
		}

		user.alexaID = alexaID;

		user.save(function(err, user) {
			if (err) {
				return cb(err, null);
			}

			return cb(null, user);
		});
	});
};

module.exports = {
	registerAlexa: registerAlexa
};

