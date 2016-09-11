var mongoose = require('mongoose');

module.exports = mongoose.model('Ingredient', {
	name: String,
	amount: Number,
	expiration: Date
});
