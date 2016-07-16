var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipes = require('../models/Recipe.js');
var Authenticate   = require('../middleware/authenticate');
var Validators   = require('../middleware/validation');
var async = require('async');
var validator = require('node-validator');

//validation for the adding(update) comment
var checkComment=Validators.validateComment();
var ObjectId = require('mongoose').Types.ObjectId;



//add comment ;id=recipe id
router.put('/push/:id',validator.express(checkComment),function(req, res, next) {
  Recipes.findByIdAndUpdate(req.params.id,
    {$push : {comments:
      {
        $each: req.body.comments
      }
    }},
    {safe: true, upsert:true},
    function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


//delete comment ;id=recipe id     cid:coment id
router.put('/pull/:id/:cid',function(req, res, next) {
  Recipes.update(
    {_id:req.params.id},
    {$pull : {comments:{_id:req.params.cid}}},
    {safe: true},
    function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* GET /All comments/id */
router.get('/:id', function(req, res, next) {
  Recipes.findById(req.params.id,'comments', function (err, post) {
    if (err) return next(err);
    var myjson={"doc":[post]};
    //sendData() is send json object throgh a converter middleware
    res.status(200).sendData(myjson);
  });
});



module.exports = router;
