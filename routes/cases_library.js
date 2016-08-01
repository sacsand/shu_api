var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Caselibre = require('../models/Cases_Library');
var multer  = require('multer');
var path =require('path');
//var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
/* GET /all cases. */
router.get('/', function(req, res, next) {

     var page = Number(req.param('page'));
     var limit = Number(req.param('limit'));

 Caselibre.paginate('title',{ page: page, limit: limit },function (err, post) {
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

router.post('/add',multer({ dest: './uploads/'}).single('photo'),function(req,res,next){
  //var newWanted = new Wanted();
  console.log(req.file);
  console.log(req.body);

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
};
var image = base64_encode(req.file.path);

Caselibre.create(
  {"title":req.body.title,
   "case_id":req.body.case_id,
   "image":image,
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
    var myjson={"doc":[post]};
    //sendData() is send json object throgh a converter middleware
    res.status(200).sendData(myjson);
  });
});





router.delete('/:id', function(req, res, next) {
  Caselibre.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
