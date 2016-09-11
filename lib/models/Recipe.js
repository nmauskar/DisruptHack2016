var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectID;

var schema = new mongoose.Schema({
	name: String,
	ingredients: [{ ref: 'Ingredient', type: ObjectID }]
});

module.exports = mongoose.model('Recipe', schema);
