var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Wanted = require('../models/Wanted');
var multer  = require('multer');
var path =require('path');
//var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
/* GET /all cases. */
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
/*
//  newWanted.img.data = fs.readFileSync(req.file.path);
  newWanted.data = base64_encode(req.file.path);
//  newWanted.img_path = req.file.path;
//  newWanted.img.contentType = 'image/png';
  newWanted.lastseenlocation=req.body.lastseenlocation;
  newWanted.warent=req.body.warent;

  newWanted.details.name=req.body.name;
  newWanted.details.sex=req.body.sex;
  newWanted.details.race=req.body.race;
  newWanted.details.height=req.body.height;
  newWanted.details.hairColor=req.body.hairColor;
  newWanted.details.eyeColor=req.body.eyeColor;
  newWanted.save();
  res.send(req.file);
/*  Wanted.create(
    req.body,req.files, function (err, post) {
      if (err) return next(err);
    //  res.json(post);
      res.send(post);
    }); */

/* PUT /recipes/:id */
router.put('/:id',function(req, res, next) {
  Wanted.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /recipes/id */
router.get('/:id', function(req, res, next) {
  Wanted.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    var myjson={"doc":[post]};
    //sendData() is send json object throgh a converter middleware
    res.status(200).sendData(myjson);
  });
});


/* DELETE /recipes/:id */
router.delete('/:id', function(req, res, next) {
  Wanted.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
