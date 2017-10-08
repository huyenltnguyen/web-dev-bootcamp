const express = require('express');
const app = express();

// '/' => 'Hi there, welcome to my first express app!'
app.get('/', function(req, res) {
	res.send('Hi there, welcome to my first express app!');
});

// '/speak/:animal' => The [animal] says [animal sound]
app.get('/speak/:animal', function(req, res) {
	const sounds = {
		'pig': 'Oink',
		'cow': 'Moo',
		'dog': 'Woof Woof!',
		'cat': 'I hate you, human',
		'goldfish': '...'
	};

	const animal = req.params.animal.toLowerCase();

	if (sounds[animal]) {
		res.send(`The ${animal} says '${sounds[animal]}'`);
	} else {
		res.send(`The ${animal} doesn't say anything`);	
	}
	
});

// '/repeat/:times' => repeat the word [times] times
app.get('/repeat/:word/:times', function(req,res) {
	const word = req.params.word;
	const times = Number(req.params.times);
	let message = '';

	for (let i = 0; i < times; i++) {
		message += word + ' ';
	}

	res.send(message);

});

app.get('*', function(req, res) {
	res.send('Sorry, page not found... What are you doing with your life?');
});

// Tell Express to listen to requests (start server)
app.listen(3000, function() {
	console.log('App is running on port 3000');
});