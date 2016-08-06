var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Notes = require('../models/Notes');


router.get('/', function(req, res, next) {

     var page = Number(req.param('page'));
     var limit = Number(req.param('limit'));

 Notes.paginate({},{ page: page, limit: limit },function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/', function(req, res, next) {
Notes.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.put('/:id',function(req, res, next) {
  Notes.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.get('/:id', function(req, res, next) {
  Notes.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    var myjson={"doc":[post]};

    res.status(200).sendData(myjson);
  });
});



router.delete('/:id', function(req, res, next) {
  Notes.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
