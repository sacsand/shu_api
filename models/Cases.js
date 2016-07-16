var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var CasesSchema = new mongoose.Schema({
  name: {
    type: String,
    },
  description:String,
  note: String,
  images:{
    type: String,
    },
  location:String,
  station:String,
  opendate:{ type: Date },
  published_at:{ type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

CasesSchema.plugin(mongoosePaginate);

var Cases =mongoose.model('Cases', CasesSchema);
module.exports = Cases;
