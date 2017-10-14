const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

let catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

const Cat = mongoose.model('Cat', catSchema);

// adding a new cat to the DB

// const george = new Cat({
// 	name: 'George',
// 	age: 11,
// 	temperament: 'Grouchy'
// });

// george.save(function(err, cat) {
// 	if (err) {
// 		console.log('Something went wrong');
// 	} else {
// 		console.log('We just save the cat to the DB');
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: 'Snow White',
	age: 15,
	temperament: 'Bland'
}, function(err, cat) {
	if (err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});

// retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats) {
	if (err) {
		console.log('Oh no! Error!');
		console.log(err);
	} else {
		console.log('All the cats');
		console.log(cats);
	}
});