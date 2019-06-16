var express = require('express');
var router = express.Router();

const userRoutes = require('./users');
const processRoutes = require('./process');

module.exports = function(app) {
   
  // Add routes for use 

  app.use('/insta-profile', userRoutes);
  
  // process related routes to run crawler
  app.use('/process', processRoutes);

}
