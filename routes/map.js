var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Maps = require('../models/Map');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var Pusher = require('pusher');
var pusher = new Pusher({
    appId: '233180',
    key: '985ac896cda360ab3d06',
    secret: '052e87cb406d1b78ea37',
    encrypted: true
});

/* GET /all cases. */
router.get('/', function(req, res, next) {
    Maps.find({}, function(err, maps) {
        res.json(maps);
    });
});

router.post('/add', function(req, res, next) {
    Maps.create(req.body, function(err, post) {
        if (err) return next(err);

        pusher.trigger('my_chanel', 'marker_added', post);
        res.json(post);
    });
});

router.get('/count', function(req, res, next) {
    Maps.count({}, function(err, count) {
        console.log("Number of Incient:", count);
        res.json(count);

    })
});


module.exports = router;
