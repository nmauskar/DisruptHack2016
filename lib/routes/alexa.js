var verifier = require('alexa-verifier');
var express  = require('express');
var alexa = require('alexa-app');
var app = new alexa.app('fridge');
var recipeController = require('../controllers/recipe');
var ingredientController = require('../controllers/ingredients');

modules.export = function(){
	var router = express.Router();

	app.intent('GetMealsIntent', function(request, response){
		// recipeController.fetchAllRecipes( request.session('userId').toString(),
		// 		function(err, recipes){
		// 			if(err){
		// 				response.say("Internal server error, could not complete task.");
		// 			}
		// 			else
		// 			{
		// 				response.say("These are the meals you can make " +
		// 					recipes.map(function(recipe){
		// 					return recipe.name;
		// 				}).join(", ") + ".");
		// 			}
		// 		});
		response.say("These are the meals you can make " + request.session('userId').toString());
	});

	// app.intent('', function(request, response){
	// 	ingredientController.fetchAllRecipes( request.session('userId').toString(),
	// 			function(err, recipes){
	// 				if(err){
	// 					response.say("Internal server error, could not complete task.");
	// 				}
	// 				else
	// 				{
	// 					response.say(recipes.map(function(recipe){
	// 						return recipe.name;
	// 					}).join(", "));
	// 				}
	// 			});
	// });

	// the alexa API calls specify an HTTPS certificate that must be validated.
	// the validation uses the request's raw POST body which isn't available from
	// the body parser module. so we look for any requests that include a
	// signaturecertchainurl HTTP request header, parse out the entire body as a
	// text string, and set a flag on the request object so other body parser
	// middlewares don't try to parse the body again
	router.use(function(req, res, next){
		console.log('routing');

		if (!req.headers.signaturecertchainurl){
			return next();
		}

		// mark the request body as already having been parsed so it's ignored by
		// other body parser middlewares
		req._body = true;
		req.rawBody = '';
		req.on('data', function(data){
			return req.rawBody += data;
		});
		req.on('end', function(){
			var cert_url, er, error, requestBody, signature;
			try{
				req.body = JSON.parse(req.rawBody);
			} catch (error){
				er = error;
				req.body = {};
			}
			cert_url = req.headers.signaturecertchainurl;
			signature = req.headers.signature;
			requestBody = req.rawBody;
			verifier(cert_url, signature, requestBody,
					function(er){
						if (er){
							console.error('error validating the alexa cert:', er);
							res.status(401).json({
								status: 'failure',
								reason: er
							});
						}
						else
						{
							next();
						}
					});
		});
	});

	router.route('/fridge')
	.get(function(req, res) {
		console.log('get', req.body)
		app.request(req.body)
		.then(function(response) {
			res.json(response);
		})
	})
	.post(function(req, res) {
		console.log(req.body)
		app.request(req.body)
		.then(function(response) {
			res.json(response);
		})
	});

};
