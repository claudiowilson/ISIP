'use strict';

var quiz = require('./controllers/quiz');

module.exports = function routes(app) {
	app.get('/', quiz.index);

	app.get('/quiz', quiz.quiz);

	app.post('/results', quiz.results);
}