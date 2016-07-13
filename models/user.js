// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean,
    station:String,
    police_id:Number,
    messages_received:[{
            content:String,
            received_at:{ type: Date, default: Date.now }
    }],
    messages_send:[{
            content:String,
            sent_at:{ type: Date, default: Date.now }
    }]
}));
