'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();

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
  
  var port = process.env.PORT || 8080;
  app.listen(port);

  console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
});
