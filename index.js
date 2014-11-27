var koa = require('koa'),
	router = require('koa-router'),
	views = require('co-views'),
	serve = require('koa-static');
var app = koa();

app.use(router(app));

app.use(serve('public'));

var render = views(__dirname + '/views', {
	map : {html: 'swig'}
});

app.get('/', function* (next) {
	this.body = yield render('start.html');
});

// app.use(function* (next) {
// 	if (this.request.path !== '/') {
// 		return yield next;
// 	}
// 	this.response.body = 'hello world';
// });

// app.use(function* (next) {
// 	if (this.request.path !== '/404') {
// 		return yield next;
// 	}
// 	this.response.body = 'page not found';
// });

// app.use(function* (next) {
// 	if (this.request.path !== '/500') {
// 		return yield next;
// 	}
// 	this.response.body = 'internal server error';
// });

app.listen(3000);
