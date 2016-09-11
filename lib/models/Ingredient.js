var mongoose = require('mongoose');

module.exports = mongoose.model('Ingredient', {
	name: String,
	something: Number,
	someArray: [{ a: Number, b: Date }]
});
