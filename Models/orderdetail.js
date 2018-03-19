var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    price: {type: String, required: true},
    quantity: {type: String, required: true},
});

module.exports = mongoose.model('OrderDetail', schema);