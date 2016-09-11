var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Recipe = new mongoose.Schema({
	name: String,
	ingredients: [{ ref: 'Ingredient', type: ObjectId }]
});

module.exports = mongoose.model('Recipe', Recipe);