var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    dateorder:{type:Date},
    status: {type: String},
    paymentcard: {type: String}
});

module.exports = mongoose.model('Order', schema);