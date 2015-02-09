var router = require('express').Router();
var env = require('../.env.js');
var models = require('../models');

router.get('/',
	function (req, res, next) {
		models.Hotel
			.find({})
			.exec(function (err, hotels) {
				// attach data to res.locals and then go on
				res.locals.all_hotels = hotels;
				next();
			});
	},
	function (req, res, next) {
		models.ThingToDo
			.find({})
			.exec(function (err, thingsToDo) {
				// attach data to res.locals and then go on
				res.locals.all_things_to_do = thingsToDo;
				next();
			});
	},
	function (req, res, next) {
		models.Restaurant
			.find({})
			.exec(function (err, restaurants) {
				// attach data to res.locals and then go on
				res.locals.all_restaurants = restaurants;
				next();
			});
	},
	function (req, res) {
		// all the data attached to res.locals will now be passed to the index template
		res.render('index', {key: env.google_api_key});
	});

module.exports = router;