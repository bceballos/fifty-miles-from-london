'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
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
    console.log('try this:\ncurl http://127.0.0.1:' + port + "/get?name=https://bpdts-test-app.herokuapp.com/users");
  } else {
    console.log("Chief it don't");
  }
});
