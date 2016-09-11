var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var User = new mongoose.Schema({
	username: String,
	alexaID: String,
	fridge: [{ ref: 'Ingredient', type: ObjectId }],
	recipes: [{ ref: 'Recipe', type: ObjectId }]
});

module.exports = mongoose.model('User', User);
