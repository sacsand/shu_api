var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;



var WantedSchema = new mongoose.Schema({
  warent: {
    type: String,
    },
  description:String,
  lastseenlocation:String,
  details:[{
    name:String,
    sex:String,
    race:String,
    height:Number,
    weight:Number,
    hairColor:String,
    eyeColor:String
  }],
  data:String,
  img:{
    data:Buffer,
    contentType:String
  },
  published_at:{ type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

WantedSchema.plugin(mongoosePaginate);

var Wanted =mongoose.model('Wanted', WantedSchema);
module.exports = Wanted;
