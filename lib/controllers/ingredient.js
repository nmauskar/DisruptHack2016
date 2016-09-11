var db = require('../db');

var fetchAllIngredients = function fetchAllIngredients(userID, cb) {
	return db.ingredients.find({ 'user._id': userID }, cb);
};

var fetchIngredientById = function fetchIngredient(userID, ingredientId, cb) {
	return db.ingredients.findOne({ _id: ingredientId, 'user._id': userID }, cb);
};

var fetchIngredient = function fetchIngredient(userID, ingredient, cb) {
	return db.ingredients.findOne({ name: ingredient, 'user._id': userID }, cb);
};

var createIngredient = function createIngredient(userID, body, cb) {
	var ingredient = new db.ingredient(body);
	ingredient.user = userID;

	return ingredient.save(cb);
};

var removeIngredient = function removeIngredient(userID, ingredientId, cb) {
	return db.ingredients.find({ _id: ingredientId, 'user._id': userID }).remove(cb);
};

var fetchBadIngredients = function fetchBadIngredients(userID, cb) {
	return db.ingredients.find({ expiration: { $lte: new Date() }, 'user._id': userID }, cb);
};

module.exports = {
	fetchAllIngredients: fetchAllIngredients,
	fetchIngredient: fetchIngredient,
	createIngredient: createIngredient,
	removeIngredient: removeIngredient,
	fetchBadIngredients: fetchBadIngredients
};
