var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Cart: {type: Object, required: true},
    Address: {type: String, required: true},
    FullName: {type: String, required: true},
    PhoneNumber: {type: String, required: true},
    DateOrder:{type:Date},
    DateUpdate:{type:Date},
    PaymentType: {type: String},
    Shipping:{
        IdShipping: { type: Schema.ObjectId, ref: 'Shipping' },
        StatusTracking:{type: String}
    },
    IsDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', schema);