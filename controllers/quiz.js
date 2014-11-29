'use strict';

var	views = require('co-views'),
	path = require('path');

var render = views(path.join(__dirname + '/../views'), {
	map : {html: 'swig'}
});

var getIssues = function* () {
	/* Why doesn't this exist yet?! http://www.w3.org/TR/html-json-forms/
	 * Each value for each option should be in the format:
	 * XXXY, where XX is the value of it's similarity to Y's position (0-100)
	 * and Y is the candidate identifier
	 * so for 3 candidates, it would be like 100A075B000C
	 */ 
	return [{ issueQuestion: "Where do you stand on Social Issues?",
			  questions: [{
			  	question: "Do you care about Issue X?",
			  	name : "A1",
			  	options: [{
			  		val: "100A075B000C",
			  		text: "I believe in this [A]"
			  	},
			  	{
			  		val : "100B075A050C",
			  		text: "I believe in that [B]"
			  	},
			  	{
			  		val : "100C075B000A",
			  		text: "I believe in whatever [C]"
			  	}]
			  },
			  {
			  	question: "Do you care about Issue Y?",
			  	name : "A2",
			  	options: [{
			  		val : "100A075B000C",
			  		text : "I believe in this [A]"
			  	},
			  	{
			  		val : "100B075A050C",
			  		text: "I believe in that [B]"
			  	},
			  	{
			  		val : "100C075B000A",
			  		text: "I believe in whatever [C]"
			  	}]
			  }]
			}]
}
var parseChoice = function(choice) {
	var tally = {};
	for (var i = 0; i < choice.length; i += 4) {
		var singleTally = choice.substring(i, i + 4);
		//ASSERT: singleTalley length should be 4.
		//ASSERT: Number(args) should not be NaN
		tally[singleTally.substring(3,4)] = Number(singleTally.substring(0, 3));
	}
	return tally;
}

var getResults = function* (results) {
	if (!results) {
		return;
	}

	var numTallies = 0;
	var tallies = {}
	var highest = 0;
	var highestCandidate;
	for (var choice in results) {
		if (results.hasOwnProperty(choice)) {
			var tally = parseChoice(results[choice]);
			numTallies++;
			for (var candidate in tally) {
				if (tally.hasOwnProperty(candidate)) {
					if (tallies[candidate]) {
						tallies[candidate]['score'] += tally[candidate];
					} else {
						tallies[candidate] = {};
						tallies[candidate]['candidatename'] = candidate;
						tallies[candidate]['score'] = tally[candidate];
					}

					if (tallies[candidate]['score'] > highest) {
						highest = tallies[candidate]['score'];
						highestCandidate = candidate;
					}
					
				}
			}
		}
	}
	
	var tallyList = [];

	for (var tally in tallies) {
		if (tallies.hasOwnProperty(tally)) {
			tallies[tally]['score'] = tallies[tally]['score']/numTallies;
			tallyList.push(tallies[tally]);
		}
	}

	return {alignment : tallyList, top : highestCandidate};
}

exports.index = function* () {
	this.status = 200;
	this.body = yield render('index.html');
}

exports.quiz = function* () {
	this.status = 200;
	var questions = yield getIssues();
	this.body = yield render('quiz.html', {issues: questions});
}

exports.results = function* () {
	this.status = 200;
	var results = yield getResults(this.request.body);
	this.body = yield render('results.html', results);
}