require('dotenv').config();
const express       = require('express');
const logger        = require('morgan');
const bodyParser    = require('body-parser');

// Set up the express app
const app           = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

//Require our routes into the application
require('./server/routes')(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Setup a default catch-all route that sends back a welcome message in JSON format
  app.get('*', (req, res) => res.status(200).sendFile(path.join(__dirname, 'client/build', 'index.html')));
}


module.exports = app;