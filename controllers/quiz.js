'use strict';

var	views = require('co-views'),
	path = require('path');

var render = views(path.join(__dirname + '/../views'), {
	map : {html: 'swig'}
});

var getQuestions = function* () {
	return {question: "yolo"};
}

exports.index = function* () {
	this.body = yield render('index.html');
}

exports.quiz = function* () {
	var questions = yield getQuestions();
	this.body = yield render('quiz.html', {questions: questions});
}