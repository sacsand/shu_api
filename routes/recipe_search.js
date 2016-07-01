var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipes = require('../models/Recipe.js');
var Authenticate = require('../middleware/authenticate');
var async = require('async');


router.get('/byname/:name', function(req, res, next) {
    var r_name = req.param('name');
    Recipes.find(({'name': {'$regex': r_name }}), function(err, result) {
        if (err) return next(err);
          res.send(result);
    });
});

router.get('/byingredients/:ingd', function(req, res, next) {
    var q = req.param('ingd');
    Recipes.find(({'ingredients.name': {'$regex': q }}), function(err, result) {
        if (err) return next(err);
          res.send(result);
    });
});

router.get('/byingradient/', function(req, res, next) {
    var r_ingd = req.query.ingd;
Recipes.find({ 'ingredients.name': {$in: r_ingd } }, function(err, result) {
        if (err) return next(err);
          res.send(result);
    });
});

module.exports = router;
