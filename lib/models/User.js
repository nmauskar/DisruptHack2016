var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	_id: String,
	username: String,
	password: String,
	alexaID: String,
	paypalID: String
});

schema.path('alexaID').set(function(alexaID) {
	this._id = alexaID;

	return alexaID;
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
