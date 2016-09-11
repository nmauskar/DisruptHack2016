var HTTPError = require('http-errors');
var express = require('express');
var router = express.Router();

var utils = require('../utils');
var db = require('../db');

router.route('/')
.get(utils.checkUser(), function(req, res, next) {
	var ingredientId = '' + (req.body.ingredientId || '');

	recipe.fetchIngredient(req.user.alexaID, ingredientId, function(err, ingredient) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		if (!ingredient) {
			return next(new HTTPError.NotFound('Could not find ingredient with id "' + ingredientId + '" for user.'));
		}

		res.status(200).json(ingredient);
	});
})
.post(utils.checkUser(), function(req, res, next) {
	recipe.createIngredient(req.user.alexaID, req.body, function(err, ingredient) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		res.status(200).json(ingredient);
	});
})
.delete(utils.checkUser(), function(req, res, next) {
	var ingredientId = '' + (req.body.ingredientId || '');

	recipe.removeIngredient(req.user.alexaID, ingredientId, function(err) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		res.status(200).json('Success!');
	});
});

router.route('/all')
.get(utils.checkUser(), function(req, res, next) {
	recipe.fetchAllIngredients(req.user.alexaID, function(err, ingredients) {
		if (err) {
			return next(new HTTPError.InternalServerError('' + err));
		}

		res.status(200).json(ingredients);
	});
});

router.use(utils.jsonErrorHandler);

module.exports = router;
