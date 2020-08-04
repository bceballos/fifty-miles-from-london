'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var SwaggerUI = require('swagger-ui');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/returnUsers']) {
    // Open swagger page
  }
});
