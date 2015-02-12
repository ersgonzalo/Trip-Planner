var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');

// GET /days
dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Day
		.find()
		.populate('hotel')
		.exec(function(err, days){
			if(err) return next(err);
			res.json(days);
		})
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    models.Day.create(req.body, function (err, days){
    	if (err) return next(err);
    	res.json(days);
    });
    
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
   	models.Day.findById(req.params.id, function (err, dayData){
    	if (err) return next(err);
   		res.json(dayData)
   	});
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
   	console.log(req.params.id);
   	// models.Day.findByIdAndRemove(req.params.id, function (err){
   	// 	if (err) return next(err);
	   // 	console.log("Record removed");
   	// });
});

dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
   	console.log(req.body);
   	// models.Day.findByIdAndUpdate(req.body, function (err, days){
   	// 	if (err) return next(err);
   	// 	res.json(days);
   	// });
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant

});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});


dayRouter.put('/:id/hotel', function (req, res, next){
	models.Day.findByIdAndUpdate(req.params.id, {hotel: req.body._id}).exec(function (err, updated){
		res.send(updated);
	});
})

module.exports = dayRouter;