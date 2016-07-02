// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var router = require('./routes.js')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.listen(port);


console.log("Running at port : " + port);
console.log("GET /api")
console.log("GET /api/facts")
console.log("POST /api/facts")
console.log("GET /api/facts/:factId")
console.log("POST /api/facts/:factId")