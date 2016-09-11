var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Ingredient = new mongoose.Schema({
	user: { ref: 'User', type: ObjectId },
	name: String,
	amount: Number,
	expiration: Date
});

module.exports = mongoose.model('Ingredient', Ingredient);
