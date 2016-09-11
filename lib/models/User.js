var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	_id: String, // alexaID
	username: String,
	password: String,
	paypalID: String,
	alexaID: String,
	code: Number
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
