var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({path: path.join(__dirname, '.env')});
var serveStatic = require('serve-static');

var indexRouter = require('./routes/index');
var csvHandler = require('./routes/csvHandler');
var restHandler = require('./routes/restHandler');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../dist')));
app.use(serveStatic(__dirname + "../dist"));


app.use('/', indexRouter);
app.use('/api', csvHandler);
app.use('/api', restHandler);

module.exports = app;
