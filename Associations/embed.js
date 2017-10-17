const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

// POST - title, content
const postSchema = new mongoose.Schema({
	title: String,
	content: String
});

const Post = mongoose.model('Post', postSchema);

// USER - email, name
const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

const User = mongoose.model('User', userSchema);




// let newUser = new User({
// 	email: 'hermione@hogwarts.edu',
// 	name: 'Hermione Granger'
// });

// newUser.posts.push({
// 	title: 'How to brew polyjuice potion',
// 	content: 'Just kidding. Go to potions class to learn it!'
// });

// newUser.save(function(err, user) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// const newPost = new Post({
// 	title: 'Reflections on Apples',
// 	content: 'They are delicious'
// });

// newPost.save(function(err, post) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name: 'Hermione Granger'}, function(err, user) {
	if(err) {
		console.log(err);
	} else {
		user.posts.push({
			title: '3 Things I Really Hate',
			content: 'Voldemort Voldemort Voldemort'
		});

		user.save(function(err, user) {
			if (err) {
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});