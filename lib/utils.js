var HTTPError = require('http-errors');

var jsonErrorHandler = function jsonErrorHandler(err, req, res, next) {
	if (!err) {
		return next();
	}

	res.status(500).json('Error: ' + err);
};

var checkUser = function checkUser(blockLoggedIn) {
	return function _checkUser(req, res, next) {
		// If `blockLoggedIn` is true, block users that logged in.
		if (req.user) {
			if (blockLoggedIn) {
				return next(new HTTPError.Unauthorized('A user is already logged in.'));
			}
		} else {
			if (!blockLoggedIn) {
				return next(new HTTPError.Unauthorized('Please log in.'));
			}
		}

		next();
	};
};

module.exports = {
	jsonErrorHandler: jsonErrorHandler,
	checkUser: checkUser
};
