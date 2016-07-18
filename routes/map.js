var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Maps = require('../models/Map');
var multer  = require('multer');
var path =require('path');
var fs = require('fs');

/* GET /all cases. */
router.get('/', function(req, res, next) {
    Maps.find({},function(err,maps){
      res.json(maps);
    });
  });

  router.post('/add', function(req, res, next) {
    Maps.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;
