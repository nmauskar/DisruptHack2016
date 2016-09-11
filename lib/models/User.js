var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectID;

module.exports = mongoose.model('User', {
	username: String,
	alexaID: Number,
	fridge: [{ ref: 'Ingredient', type: ObjectID }],
	recipes: [{ref: 'Recipe', type: ObjectID}]
});
