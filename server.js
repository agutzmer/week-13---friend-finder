// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var i, j, pitches, pitchCount, winningPitchCount, winningPitcher;

var cubsPitching = [{
	name: 'Jake Arrieta',
	image: 'http://mlb.mlb.com/mlb/images/players/head_shot/453562.jpg',
	picks: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
}, 
{
	name: 'Aroldis Chapman',
	image: 'http://mlb.mlb.com/mlb/images/players/head_shot/547973.jpg',
	picks: [2, 3, 4, 5, 1, 2, 3, 4, 5, 1]
}, 
{
	name: 'Kyle Hendricks',
	image: 'http://mlb.mlb.com/mlb/images/players/head_shot/543294.jpg',
	picks: [3, 3, 1, 1, 2, 2, 4, 4, 1, 1]
}, 
{
	name: 'Travis Wood',
	image: 'http://mlb.mlb.com/mlb/images/players/head_shot/475243.jpg',
	picks: [4, 4, 1, 1, 3, 3, 5, 5, 2, 2]
}, 
{
	name: 'John Lackey',
	image: 'http://mlb.mlb.com/mlb/images/players/head_shot/407793.jpg',
	picks: [5, 5, 2, 2, 4, 4, 1, 1, 3, 3]
},	
{
	name: 'Jon Lester',
	image: 'http://mlb.mlb.com/mlb/images/players/head_shot/452657.jpg',
	picks: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
}];

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
	var message = req.params;	
	res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/api/formdata', function (req, res) {

	console.log ("got to api formdata");
	var survey = req.body;
	//newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase();
	console.log ("survey = ", survey, "\n\n");


//	pick a pitcher

	winningPitcher = 0;
	winningPitchCount = 1000;
	for (i = 0; i<cubsPitching.length; i++) {
		pitchCount = 0;
		for (j=0; j<10; j++) {
			pitches = Math.abs (parseInt(survey.picks[j]) - cubsPitching[i].picks[j]);
			pitchCount += pitches
		}
		console.log ("pitchCount = ", pitchCount, " winningPitchCount = ", winningPitchCount);
		if (pitchCount < winningPitchCount) {
			winningPitcher = i;
			winningPitchCount = pitchCount;
		}
	}
	console.log ("name = ", cubsPitching[winningPitcher].name, "winningPitcher = ", winningPitcher, "winningPitchCount = ", winningPitchCount);
	res.json(cubsPitching[winningPitcher]);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});
