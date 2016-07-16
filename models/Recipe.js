var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
//var user = require('../models/user.js');


var RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    },
  description:String,
  ingredients:[{
    amt:Number,
    unit:String,
    name:String,
  }],
  tags:Array,
  comments:[{
          user:String,
          coment:String,
          created_at:{type: Date, default: Date.now},
  }],
  shopinglist:[{
          item:String,
          amount:Number,
          unit:String,
  }],
  note: String,
  published_by:{
    type: String,
    },
  publiished_at:{ type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

RecipeSchema.plugin(mongoosePaginate);

var Recipe =mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
