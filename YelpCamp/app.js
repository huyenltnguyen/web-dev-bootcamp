const express 				= require('express'),
			app 						= express(),
			bodyParser 			= require('body-parser'),
			mongoose 				= require('mongoose'),
			flash						= require('connect-flash'),
			passport 				= require('passport'),
			LocalStrategy 	= require('passport-local'),
			methodOverride 	= require('method-override'),
			Campground 			= require('./models/campground'),
			Comment 				= require('./models/comment'),
			User 						= require('./models/user'),
			seedDB 					= require('./seeds');

// requiring routes
const campgroundRoutes 	= require('./routes/campgrounds'),
			commentRoutes 		= require('./routes/comments'),
			indexRoutes				= require('./routes/index');

const dburl = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp';
mongoose.connect(dburl);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();		// seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: "Rusty is forever the cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add currentUser, error, success to every single route
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('App is running on port 3000');
});