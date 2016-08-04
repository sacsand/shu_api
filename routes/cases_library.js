var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Caselibre = require('../models/Cases_Library');
var multer  = require('multer');
var path =require('path');
var fs = require('fs');

/* GET /all cases. */
router.get('/', function(req, res, next) {

     var page = Number(req.param('page'));
     var limit = Number(req.param('limit'));

 Caselibre.paginate({},{ page: page, limit: limit },function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/',function(req, res, next) {
Caselibre.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/add',function(req,res,next){

Caselibre.create(
  {"title":req.body.title,
   "case_id":req.body.case_id,
   "image":req.body.image,
   "type":req.body.type,
   "description":req.body.description}
  ,function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
});


router.put('/timeline/:id',function(req, res, next) {
  Caselibre.findByIdAndUpdate(req.params.id,
    {$push : {timeline:
      {
        $each: req.body.timeline
      }
    }},
    {safe: true, upsert:true},
    function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id',function(req, res, next) {
  Caselibre.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



router.get('/:id', function(req, res, next) {
  Caselibre.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    var x={"doc":[post]};
    res.status(200).sendData(x);

  });
});

router.delete('/:id', function(req, res, next) {
  Caselibre.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
