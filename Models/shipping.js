const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var ShippingSchema = new Schema({
    ShippingType: { type: String, require: true, unique: true, lowercase: true },
    Price: { type: Number, default:0},
    LocationLimit: [{type:String}]
});


module.exports = mongoose.model('Shipping', ShippingSchema);