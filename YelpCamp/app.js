const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
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
			res.render('campgrounds/index', {campgrounds: allCampgrounds});
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
	res.render('campgrounds/new');
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
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});	
});

// ====================
// COMMENTS ROUTES
// ====================
app.get('/campgrounds/:id/comments/new', function(req, res) {
	// find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render('comments/new', {campground});
		}
	});	
});

app.post('/campgrounds/:id/comments', function(req, res) {
	// lookup campground using id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	});
	
});


app.listen(3000, function() {
	console.log('App is running on port 3000');
});