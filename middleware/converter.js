var express = require('express');
var router = express.Router();
var o2x = require('object-to-xml');
var converter = require('json-2-csv');
var EasyXml = require('easyxml');
var async = require('async');
var serializer = new EasyXml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});


module.exports = {
    convert: function(req, res, next) {
        var input_tag = req.param('tag');
        res.sendData = function(obj) {
            console.log('Converter Middleware Started');
            if (!input_tag) { //if no tag
                console.log('respond with json');
                res.json(obj);
            } else {

                if (input_tag != 'csv') { //if tag is not equal to csv
                    console.log('invalid tag type');
                    res.json({
                        status: 'failed,invalid tag type',
                        message: 'provide a valid respond type',
                        availableType: 'csv'
                    });
                } else if (input_tag == 'csv') {

                    var json2csvCallback = function(err, csv) {
                        if (err) throw err;
                        res.send(csv);
                    };
                    converter.json2csv(obj, json2csvCallback);
                } else if (input_tag = 'xml') {

                    console.log('xml is here');
                }
            }

        };
        next();
    }
}
