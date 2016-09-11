var db = require('../db');
var async = require('async');

var fetchAllRecipes = function fetchAllRecipes(userID, cb) {
	return db.recipes.find({ 'user._id': userID }).populate('ingredients').exec(cb);
};

var fetchRecipe = function fetchRecipe(userID, recipeId, cb) {
	return db.recipes.findOne({ _id: recipeId, 'user._id': userID }).populate('ingredients').exec(cb);
};

var applyRecipe = function applyRecipe(userID, recipeName, cb) {
	db.recipes.findOne({ name: recipeName }).exec(function(err, recipe) {
		if (err) {
			return cb(err, null);
		}

		if (!recipe) {
			return cb(new Error('Recipe not found.'));
		}

		async.forEach(recipe.ingredients, function(ingredient, cb) {
			db.ingredients.findOne({ name: ingredient.name, 'user._id': userID }, function(err, foundIngredient) {
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
	applyRecipe: applyRecipe
};
