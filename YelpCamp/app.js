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
	image: String,
	description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Salmon Creek
// https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=1&auto=compress,format&fit=crop&w=1189&h=&q=80&cs=tinysrgb&crop=

// Mountain Goat
// https://images.unsplash.com/photo-1457368406279-ec1ecb478381?dpr=1&auto=compress,format&fit=crop&w=967&h=&q=80&cs=tinysrgb&crop=

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?dpr=1&auto=compress,format&fit=crop&w=1053&h=&q=80&cs=tinysrgb&crop=',
// 		description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
// 	}
// );

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
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render('show', {campground: foundCampground});
		}
	});
	
});

app.listen(3000, function() {
	console.log('App is running on port 3000');
});