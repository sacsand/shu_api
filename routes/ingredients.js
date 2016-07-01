var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipes = require('../models/Recipe.js');
var Authenticate   = require('../middleware/authenticate');
var Validators   = require('../middleware/validation');
var async = require('async');
var validator = require('node-validator');

//validation for the adding(update) ingredients
var checkIngredients=Validators.validateIngredients();

/*add new ingrediant to the exciting recipe*/
router.put('/:id',validator.express(checkIngredients),function(req, res, next) {
  Recipes.findByIdAndUpdate(req.params.id,
    {$push : {ingredients:
      {
        $each: req.body.ingredients
      }
    }},
    function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*only get the specific recipes ingredients*/
router.get('/:id', function(req, res, next) {
  Recipes.findById(req.params.id,'ingredients' ,function (err, post) {
    if (err) return next(err);
    res.status(200).sendData(post);
  });
});

module.exports = router;
