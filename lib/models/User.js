var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	username: String,
	password: String,
	alexaID: String,
	paypalID: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
