// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var cubsPitching 	= require('../data/pitcher-list.js');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {


var i, j, pitches, pitchCount, winningPitchCount, winningPitcher;

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
















	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!

	app.post('/api/clear', function () {
		// Empty out the arrays of data
		tableData = [];
		waitListData = [];

		console.log(tableData);
	});
};
