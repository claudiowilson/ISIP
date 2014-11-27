'use strict';

var koa = require('koa'),
	serve = require('koa-static'),
	router = require('koa-router'),
	routes = require('./routes');
var app = koa();

app.use(router(app));
app.use(serve('public'));
routes(app);

app.listen(3000);
