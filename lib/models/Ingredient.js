var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	amount: Number,
	expiration: Date
});

module.exports = mongoose.model('Ingredient', schema);
