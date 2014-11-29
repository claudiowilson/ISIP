'use strict';

var koa = require('koa'),
	serve = require('koa-static'),
	router = require('koa-router'),
	bodyParser = require('koa-bodyparser'),
	routes = require('./routes');
var app = koa();

app.use(bodyParser());
app.use(router(app));
app.use(serve('public'));
routes(app);

app.listen(3000);
