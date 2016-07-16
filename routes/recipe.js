var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipes = require('../models/Recipe.js');
var Authenticate   = require('../middleware/authenticate');
var Validators   = require('../middleware/validation');
var async = require('async');
var converter = require('json-2-csv');

var validator = require('node-validator');

//validation for the create recipe
var checkRecipe=Validators.validateRecipe();


/* GET /todos listing. */
router.get('/', function(req, res, next) {
 var page = Number(req.param('page'));
 var limit = Number(req.param('limit'));

 Recipes.paginate({},{ page: page, limit: limit },function (err, todos) {
    if (err) return next(err);
    //var csv=todos;
  console.log(req.user);
    res.status(200).sendData(todos);
  });
});

/* POST /recipes*/
router.post('/',validator.express(checkRecipe), function(req, res, next) {
  Recipes.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /recipes/:id */
router.put('/:id',function(req, res, next) {
  Recipes.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /recipes/id */
router.get('/:id', function(req, res, next) {
  Recipes.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    var myjson={"doc":[post]};
    //sendData() is send json object throgh a converter middleware
    res.status(200).sendData(myjson);
  });
});


/* DELETE /recipes/:id */
router.delete('/:id', function(req, res, next) {
  Recipes.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
