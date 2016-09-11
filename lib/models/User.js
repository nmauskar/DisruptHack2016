var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectID;


var schema = new mongoose.Schema({
	username: String,
	alexaID: Number,
	fridge: [{ ref: 'Ingredient', type: ObjectID }],
	recipes: [{ref: 'Recipe', type: ObjectID}]
});

module.exports = mongoose.model('User', schema);
