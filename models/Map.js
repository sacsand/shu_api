// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Map', new Schema({
    incident_id: String,
    title:String,
    lat:Number,
    lng:Number,
    incident_type: String,
    active: Boolean,
    Expire_Date:Date,
    published_at:{ type: Date, default: Date.now },
    updates:[{
            content:String,
            updated_at:{ type: Date, default: Date.now }
    }]
}));
