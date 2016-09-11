var db = require('../db');

var fetchAllIngredients = function fetchAllIngredients(alexaID, cb) {
	return db.ingredients.find({ 'user._id': alexaID }, cb);
};

var fetchIngredientById = function fetchIngredient(alexaID, ingredientId, cb) {
	return db.ingredients.findOne({ _id: ingredientId, user: alexaID }, cb);
};

var fetchIngredient = function fetchIngredient(alexaID, ingredient, cb) {
	return db.ingredients.findOne({ name: ingredient, user: alexaID }, cb);
};

var createIngredient = function createIngredient(alexaID, body, cb) {
	var ingredient = new db.ingredient(body);
	ingredient.user = alexaID;

	return ingredient.save(cb);
};

var removeIngredient = function removeIngredient(alexaID, ingredientId, cb) {
	return db.ingredients.findById(ingredientId).remove(cb);
};

var fetchBadIngredients = function fetchBadIngredients(alexaID, cb) {
	return db.ingredients.find({ expiration: { $lte: new Date() } }, cb);
};

module.exports = {
	fetchAllIngredients: fetchAllIngredients,
	fetchIngredient: fetchIngredient,
	createIngredient: createIngredient,
	removeIngredient: removeIngredient,
	fetchBadIngredients: fetchBadIngredients
};
