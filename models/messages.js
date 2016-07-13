var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var NewsSchema = new mongoose.Schema({
  Title: {
    type: String,
    },
  content:String,
  sources:{
    type: String,
    },
  location:String,
  station:String,
  opendate:{ type: Date },
  published_at:{ type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

CasesSchema.plugin(mongoosePaginate);

var Messages =mongoose.model('Messages', CasesSchema);
module.exports = Messages;
