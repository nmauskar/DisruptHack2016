var HTTPError = require('http-errors');
var express = require('express');
var router = express.Router();

var utils = require('../utils');
var db = require('../db');

router.route('/')
.get(utils.checkUser(), function(req, res, next) {
	var recipeId = '' + (req.body.recipeId || '');

	recipe.fetchRecipe(req.user._id, recipeId, function(err, recipe) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		if (!recipe) {
			return next(new HTTPError.NotFound('Could not find recipe with id "' + recipeId + '" for user.'));
		}

		res.status(200).json(recipe);
	});
})
.post(utils.checkUser(), function(req, res, next) {
	recipe.createRecipe(req.user._id, req.body, function(err, recipe) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		res.status(200).json(recipe);
	});
})
.delete(utils.checkUser(), function(req, res, next) {
	var recipeId = '' + (req.body.recipeId || '');

	recipe.removeRecipe(req.user._id, recipeId, function(err) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		res.status(200).json('Success.');
	});
});

router.route('/all')
.get(utils.checkUser(), function(req, res) {
	recipe.fetchAllRecipes(req.user._id, function(err, recipes) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		res.status(200).json(recipes);
	});
});

router.use(utils.jsonErrorHandler);

module.exports = router;
