const url = require('url');
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

var webpack = require('webpack');
var webpackMiddleware = require("koa-webpack-dev-middleware");
var webpackConfig = require('./webpack.config.js');

app.use(webpackMiddleware(webpack(webpackConfig))),
    app.use(async (ctx) => {
        const req = ctx.req;
        const res = ctx.res;
        let pathname = url.parse(req.url).pathname;
        let data = null;
        let targetPath = null;
        if (pathname === '/') {
            pathname = '/index.html'
        }
        targetPath = `.${pathname}`;
        if (fs.existsSync(targetPath)) {
            data = fs.readFileSync(targetPath);
            res.statusCode = 200;
            res.end(data);
        }
    });

app.listen(3000);