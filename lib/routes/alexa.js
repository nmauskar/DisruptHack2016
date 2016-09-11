var verifier = require('alexa-verifier');
var express  = require('express');
var alexa = require('alexa-app');
var app = new alexa.app('fridge');
var recipeController = require('../controllers/recipe');
var ingredientController = require('../controllers/ingredient');
var userController = require('../controllers/user');

var util = require('util');

var router = express.Router();

app.intent('GetMealsIntent', function(request, response){
	recipeController.fetchAllRecipes(request.data.session.user.userId, function(err, recipes){
		if (err) {
			return response.say('Internal server error, could not complete task.');
		}

		response.say(
			'These are the meals you can make: ' +
			recipes.map(function(recipe) {
				return recipe.name;
			}).join(', ') + '.'
		);
	});
});

app.intent('GoneBadIntent', function(request, response) {
	ingredientController.fetchBadIngredients(request.data.session.user.userId, function(err, ingredients){
		if (err) {
			return response.say('Internal server error, could not complete task.');
		}

		response.say(
			'These are the ingredients that have gone bad: ' +
			ingredients.map(function(ingredient) {
				return ingredient.name;
			}).join(', ') + '.'
		);
	});
});

app.intent('TellAmountIntent', function(request, response) {
	ingredientController.fetchIngredient(
		request.data.session.user.userId,
		request.data.request.intent.name.slots.IngredientName.value,
		function(err, ingredient){
			if (err) {
				return response.say('Internal server error, could not complete task.');
			}

			response.say("You have " + ingredient.amount + " pounds of " +
				ingredient.name + ".");
		}
	);
});


app.intent('RegisterIntent', function(request, response) {
	console.log(util.inspect(request, { depth: 10 }));
	userController.registerAlexa(
		request.data.session.user.userId,
		request.data.request.intent.slots.Code.value,
		function(err, user) {
			console.log(err, user);

			if (err) {
				return response.say('Internal server error, could not complete task.');
			}

			response.say("You have sucessfully registered with fridge tech!");
		}
	);
});

app.intent('TellAllIntent', function(request, response) {
	ingredientController.fetchAllIngredients(request.data.session.user.userId, function(err, ingredients){
		console.log(err);

		if (err) {
			return response.say('Internal server error, could not complete task.');
		}

		if (ingredients.length() > 1) {
			response.say('You have ' +
				ingredients.map(function(ingredient) {
					return ingredient.name;
				}).slice(0, -1).join(', ') + ' and ' + ingredients.pop().name);
		}
		else if (ingredients.length() === 1) {
			response.say('You have ' + ingredients.pop().name + ' in your fridge.');
		} else {
			response.say('You have nothing in your fridge.');
		}
	});
});

app.intent('MakeIntent', function(request, response) {
	recipeController.applyRecipe(
		request.data.session.user.userId,
		request.data.request.intent.slots.RecipeName.value,
		function(err, success) {
			if (err) {
				return response.say('Internal server error, could not complete task.');
			}

			response.say('All ingredients in the recipe have been tracked as used.');
		}
	);
});


// the alexa API calls specify an HTTPS certificate that must be validated.
// the validation uses the request's raw POST body which isn't available from
// the body parser module. so we look for any requests that include a
// signaturecertchainurl HTTP request header, parse out the entire body as a
// text string, and set a flag on the request object so other body parser
// middlewares don't try to parse the body again
router.use(function(req, res, next) {
	if (!req.headers.signaturecertchainurl) {
		return next();
	}

	// mark the request body as already having been parsed so it's ignored by
	// other body parser middlewares
	req._body = true;
	req.rawBody = '';

	req.on('data', function(data) {
		return req.rawBody += data;
	});

	req.on('end', function(){
		var cert_url, er, error, requestBody, signature;

		try {
			req.body = JSON.parse(req.rawBody);
		} catch (error) {
			er = error;
			req.body = {};
		}

		cert_url = req.headers.signaturecertchainurl;
		signature = req.headers.signature;
		requestBody = req.rawBody;

		verifier(cert_url, signature, requestBody, function(error) {
			if (!error) {
				return next();
			}

			console.error('error validating the alexa cert:', error);

			res.status(401).json({
				status: 'failure',
				reason: error
			});
		});
	});
});

router.route('/')
.post(function(req, res) {
	app.request(req.body).then(function(response) {
		res.json(response);
	});
});

module.exports = router;


