const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// ROOT ROUTE
router.get('/', function(req, res) {
	res.render('landing');
});

// ===============
// AUTH ROUTES
// ===============

// REGISTER ROUTES
// show register form
router.get('/register', function(req,res) {
	res.render('register');
});

// handle sign up logic
router.post('/register', function(req, res) {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			req.flash('error', err.message);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Welcome to YelpCamp, ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

// LOGIN ROUTES
// show login form
router.get('/login', function(req, res) {
	res.render('login');
});

// handle login logic
router.post('/login', passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}), function(req, res) {
});


// LOGOUT ROUTE
// handle logout logic
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/campgrounds');
});

module.exports = router;