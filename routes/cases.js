var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Cases = require('../models/Cases');

/* GET /all cases. */
router.get('/', function(req, res, next) {

     var page = Number(req.param('page'));
     var limit = Number(req.param('limit'));

 Cases.paginate({},{ page: page, limit: limit },function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /recipes*/
router.post('/', function(req, res, next) {
Cases.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /recipes/:id */
router.put('/:id',function(req, res, next) {
  Cases.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /recipes/id */
router.get('/:id', function(req, res, next) {
  Cases.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    var myjson={"doc":[post]};
    //sendData() is send json object throgh a converter middleware
    res.status(200).sendData(myjson);
  });
});


/* DELETE /recipes/:id */
router.delete('/:id', function(req, res, next) {
  Cases.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
