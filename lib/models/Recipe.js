var mongoose = require('mongoose');

module.exports = mongoose.model('Recipe', {
	name: String,
	something: Number,
	someArray: [{ a: Number, b: Date }]
});
