var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var CasesLibrSchema = new mongoose.Schema({
  title:String,
  case_id:String,
  type:String,
  description:String,
  timeline:[{
    title:String,
    content:String,
    updated_at: { type: Date, default: Date.now },
  }],
  image:String,
  published_at:{ type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

CasesLibrSchema.plugin(mongoosePaginate);

var CasesLibrSchema =mongoose.model('Cases_Library', CasesLibrSchema);
module.exports = CasesLibrSchema;
