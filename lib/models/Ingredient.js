var mongoose = require('mongoose');

var Ingredient = new mongoose.Schema({
	name: String,
	amount: Number,
	expiration: Date
});

module.exports = mongoose.model('Ingredient', Ingredient);
