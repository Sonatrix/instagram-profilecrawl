var express = require('express');
var router = express.Router();

const userRoutes = require('./users');
const processRoutes = require('./process');

module.exports = function(app) {
   
  app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  })

  app.use('/insta-profile', userRoutes);
  
  // process related routes to run crawler
  app.use('/process', processRoutes);

}
