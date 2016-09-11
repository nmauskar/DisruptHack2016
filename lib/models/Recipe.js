var mongoose = require('mongootse');
var ObjectID = mongoose.Schema.Types.ObjectID;

module.exports = mongoose.model('Recipe', {
	name: String,
	ingredients: [{ ref: 'Ingredient', type: ObjectID }]
});
