var koa = require('koa');

var app = koa();

app.use(function* () {
	this.response.body = 'hello world';
});

app.listen(3000);
