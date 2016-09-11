var db = require('../db');

var fetchAllRecipes = function fetchAllRecipes(alexaID, cb) {
	return db.recipes.find({ user: alexaID }).populate('ingredients').exec(cb);
};

var fetchRecipe = function fetchRecipe(alexaID, recipeId, cb) {
	return db.recipes.findOne({ _id: recipeId, user: alexaID }).populate('ingredients').exec(cb);
};

var createRecipe = function createRecipe(alexaID, body, cb) {
	async.series(req.body.ingredients || [], function(ingredient, cb) {
		db.ingredients.findOne({ _id: ingredient, user: alexaID }, function(err, ingredientFound) {
			if (err) {
				return cb(err);
			}

			if (!ingredientFound) {
				return cb(new Error('Could not find ingredient with id "' + ingredient + '".'));
			}

			cb(null);
		});
	}, function(err) {
		if (err) {
			return cb(err, null);
		}

		var recipe = new db.recipe(req.body);
		recipe.user = alexaID;

		recipe.save(function(err, recipe) {
			if (err) {
				return cb(err, null);
			}

			db.recipe.populate(recipe, { path: 'ingredients' }, cb);
		});
	});
};

var removeRecipe = function removeRecipe(alexaID, recipeId, cb) {
	return db.recipes.findById(recipeId).remove(cb);
};

module.exports = {
	fetchAllRecipes: fetchAllRecipes,
	fetchRecipe: fetchRecipe,
	createRecipe: createRecipe,
	removeRecipe: removeRecipe
};
