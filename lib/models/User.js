var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	username: String,
	password: String,
	alexaID: String,
	fridge: [{ ref: 'Ingredient', type: ObjectId }],
	recipes: [{ ref: 'Recipe', type: ObjectId }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
