const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds', {campgrounds: allCampgrounds});
		}
	});	
});

app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const newCampground = { name, image };

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

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.listen(3000, function() {
	console.log('App is running on port 3000');
});