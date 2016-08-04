var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Wanted = require('../models/Wanted');
var multer  = require('multer');
var path =require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {

     var page = Number(req.param('page'));
     var limit = Number(req.param('limit'));

 Wanted.paginate({},{ page: page, limit: limit },function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/',function(req, res, next) {
Wanted.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/file-upload',multer({ dest: './uploads/'}).single('photo'),function(req,res,next){
  console.log(req.file);
  console.log(req.body);

function base64_encode(file) {

    var bitmap = fs.readFileSync(file);

    return new Buffer(bitmap).toString('base64');
};
var image = base64_encode(req.file.path);
Wanted.create(
  {"warent":req.body.warent,
   "data":image,
   "lastseenlocation":req.body.lastseenlocation,
   "description":req.body.description,
   "details":[{
        "name":req.body.name,
        "sex":req.body.sex,
        "race":req.body.race,
        "height":req.body.height,
        "weight":req.body.weight,
        "hairColor":req.body.hairColor,
        "eyeColor":req.body.eyeColor
   }]  }
  ,function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
});
router.put('/:id',function(req, res, next) {
  Wanted.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  Wanted.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    var myjson={"doc":[post]};
    res.status(200).sendData(myjson);
  });
});



router.delete('/:id', function(req, res, next) {
  Wanted.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
