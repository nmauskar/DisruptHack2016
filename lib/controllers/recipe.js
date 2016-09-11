var db = require('../db');
var async = require('async');

var fetchAllRecipes = function fetchAllRecipes(alexaID, cb) {
	return db.recipes.find({ user: alexaID }).populate('ingredients').exec(cb);
};

var fetchRecipe = function fetchRecipe(alexaID, recipeId, cb) {
	return db.recipes.findOne({ _id: recipeId, user: alexaID }).populate('ingredients').exec(cb);
};

// var createRecipe = function createRecipe(alexaID, body, cb) {
// 	async.series(req.body.ingredients || [], function(ingredient, cb) {
// 		db.ingredients.findOne({ _id: ingredient, user: alexaID }, function(err, ingredientFound) {
// 			if (err) {
// 				return cb(err);
// 			}

// 			if (!ingredientFound) {
// 				return cb(new Error('Could not find ingredient with id "' + ingredient + '".'));
// 			}

// 			cb(null);
// 		});
// 	}, function(err) {
// 		if (err) {
// 			return cb(err, null);
// 		}

// 		var recipe = new db.recipe(req.body);
// 		recipe.user = alexaID;

// 		recipe.save(function(err, recipe) {
// 			if (err) {
// 				return cb(err, null);
// 			}

// 			db.recipe.populate(recipe, { path: 'ingredients' }, cb);
// 		});
// 	});
// };

// var removeRecipe = function removeRecipe(alexaID, recipeId, cb) {
// 	return db.recipes.findById(recipeId).remove(cb);
// };

var applyRecipe = function applyRecipe(alexaID, recipeName, cb) {
	db.recipes.findOne({ name: recipeName }).exec(function(err, recipe) {
		if (err) {
			return cb(err, null);
		}

		if (!recipe) {
			return cb(new Error('Recipe not found.'));
		}

		async.forEach(recipe.ingredients, function(ingredient, cb) {
			db.ingredients.findOne({ name: ingredient.name, user: alexaID }, function(err, foundIngredient) {
				if (err) {
					return cb(err);
				}

				if (!foundIngredient) {
					return cb(new Error('Could not find ingredient with name "' + ingredient.name + '" for user'));
				}

				foundIngredient.amount -= ingredient.amount;

				if (foundIngredient.amount < 0) {
					foundIngredient.amount = 0;
				}

				foundIngredient.save(function(err, foundIngredient) {
					if (err) {
						return cb(err);
					}

					return cb();
				});
			});
		}, function(err) {
			if (err) {
				return cb(err);
			}

			return cb(null);
		});
	});
};

module.exports = {
	fetchAllRecipes: fetchAllRecipes,
	fetchRecipe: fetchRecipe,
	// createRecipe: createRecipe,
	// removeRecipe: removeRecipe,
};
