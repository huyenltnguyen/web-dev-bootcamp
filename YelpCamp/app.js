const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', {campgrounds: allCampgrounds});
		}
	});	
});

// CREATE - add new campground to DB
app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const description = req.body.description;
	const newCampground = { name, image, description };

	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});	
});

// NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that campground
			res.render('show', {campground: foundCampground});
		}
	});	
});

app.listen(3000, function() {
	console.log('App is running on port 3000');
});