'use strict';

var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync(__dirname + '/keys/key.pem'', 'utf8');
var certificate = fs.readFileSync(__dirname + '/keys/key-cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};


var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var logger = require('./logger');

module.exports = app; // for testing

/*app.get('/api', function(req,res) {
		res.render('index.html');
});*/

app.use(express.static('public'));

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  
  var port = process.env.PORT || 80;
  logger.info('Listening to port=' + port);
  app.listen(port);

  console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
});
