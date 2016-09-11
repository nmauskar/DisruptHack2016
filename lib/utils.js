var HTTPError = require('http-errors');

var jsonErrorHandler = function jsonErrorHandler(err, req, res, next) {
	if (!err) {
		return next();
	}

	res.status(500).json('Error: ' + err);
};

var checkUser = function checkUser(req, res, next) {
	return function _checkUser(blockLoggedIn) {
		// If `blockLoggedIn` is true, block users that logged in.
		if (req.user) {
			if (blockLoggedIn) {
				next(new HTTPError.Unauthorized('A user is already logged in.'));
			}
		} else {
			if (!blockLoggedIn) {
				next(new HTTPError.Unauthorized('Please log in.'));
			}
		}
	};
};

module.exports = {
	jsonErrorHandler: jsonErrorHandler,
	checkUser: checkUser
};
