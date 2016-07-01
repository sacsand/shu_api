var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User   = require('../models/user'); // get our mongoose model
var Authenticate   = require('../middleware/authenticate'); // get our mongoose model
var Validators   = require('../middleware/validation');
var validator = require('node-validator');

//validation for the create recipe
var checkUser=Validators.validateUser();


var app = express();
// get an instance of the router for api routes
var apiRoutes = express.Router();
var session = require('express-session')
app.set('superSecret',config.secret);



apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        req.user=user._id;
        console.log(req.user);
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 14400 // expires in 24 hours

        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userid:user._id
        });
      }

    }

  });
});

/* POST /users*/
apiRoutes.post('/users',validator.express(checkUser), function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

apiRoutes.get('/users',function(req,res){
  User.find({},function(err,users){
    res.json(users);
  });
});
  module.exports = apiRoutes;
