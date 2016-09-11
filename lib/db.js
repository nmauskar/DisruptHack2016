var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fridge');

var db = {};

db.users = db.user = require('./models/User');
db.recipes = db.recipe = require('./models/Recipe');
db.ingredients = db.ingredient = require('./models/Ingredient');

module.exports = db;
