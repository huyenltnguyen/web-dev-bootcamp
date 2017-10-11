const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let campgrounds = [
		{ name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=1&auto=compress,format&fit=crop&w=1189&h=&q=80&cs=tinysrgb&crop=' },
		{ name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?dpr=1&auto=compress,format&fit=crop&w=1053&h=&q=80&cs=tinysrgb&crop=' },
		{ name: 'Mountain Goat\'s Rest', image: 'https://images.unsplash.com/photo-1457368406279-ec1ecb478381?dpr=1&auto=compress,format&fit=crop&w=967&h=&q=80&cs=tinysrgb&crop=' },
		{ name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1501703979959-797917eb21c8?dpr=1&auto=compress,format&fit=crop&w=1189&h=&q=80&cs=tinysrgb&crop=' },
		{ name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?dpr=1&auto=compress,format&fit=crop&w=1053&h=&q=80&cs=tinysrgb&crop=' },
		{ name: 'Mountain Goat\'s Rest', image: 'https://images.unsplash.com/photo-1457368406279-ec1ecb478381?dpr=1&auto=compress,format&fit=crop&w=967&h=&q=80&cs=tinysrgb&crop=' }
	];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	campgrounds.push({name, image});
	// redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.listen(3000, function() {
	console.log('App is running on port 3000');
});