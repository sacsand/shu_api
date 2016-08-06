var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var NotesSchema = new mongoose.Schema({
  name: {
    type: String,
    },
  userid:String,
  published_at:{ type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

NotesSchema.plugin(mongoosePaginate);

var Notes =mongoose.model('Notes', NotesSchema);
module.exports = Notes;
