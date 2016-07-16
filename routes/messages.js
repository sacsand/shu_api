var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User   = require('../models/user'); // get our mongoose model
var Authenticate   = require('../middleware/authenticate'); // get our mongoose model
var Validators   = require('../middleware/validation');
var validator = require('node-validator');


router.put('/received/push/:id',function(req, res, next) {
//  var message=req.body.content;

///     console.log(message);
    // console.log(req.body);
  User.findByIdAndUpdate(req.params.id,
    {$push : {messages_received:
      {
        $each: req.body.messages
      }
    }},
    {safe: true, upsert:true},
    function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /All messages of a user/id */
router.get('/received/:id', function(req, res, next) {
  User.findById(req.params.id,'messages_received', function (err, post) {
    if (err) return next(err);
      res.send(post);
  });
});

  module.exports = router;
