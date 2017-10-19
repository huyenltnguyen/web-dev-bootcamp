const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
	{
		name: 'Salmon Creek',
		image: 'https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=1&auto=compress,format&fit=crop&w=1189&h=&q=80&cs=tinysrgb&crop=',
		description: 'blah blah blah'
	},
	{
		name: 'Mountain Goat',
		image: 'https://images.unsplash.com/photo-1457368406279-ec1ecb478381?dpr=1&auto=compress,format&fit=crop&w=967&h=&q=80&cs=tinysrgb&crop=',
		description: 'blah blah blah'
	},
	{
		name: 'Silverthorne',
		image: 'https://images.unsplash.com/photo-1496303861503-f6ec4e50034e?dpr=1&auto=format&fit=crop&w=1950&q=60&cs=tinysrgb',
		description: 'blah blah blah'
	}
];

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, function(err) {
		if(err) {
			console.log(err);	
		}	else {
			console.log("removed campground");
			// Add a few campgrounds
			data.forEach(function(seed) {
				Campground.create(seed, function(err, campground) {
					if(err) {
						console.log(err);
					} else {
						console.log('added a campground');
						// Create a comment
						Comment.create(
							{
								text: 'This place is great, but I wish there was internet',
								author: 'Homer'
							}, function(err, comment) {
								if(err) {
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log('created new comment');
								}
								
							}
						);
					}
				});
			});
		}
	});
}

module.exports = seedDB;