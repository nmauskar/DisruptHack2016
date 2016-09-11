var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name: String,
	something: Number,
	someArray: [{ a: Number, b: Date }]
});
