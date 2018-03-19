const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var ProductSchema = new Schema({
    nameproduct: { type: String },
    description:{type:String},
    size: { type: String},
    color: { type: String},
    catalog:{type:String},
    price:{type:Number},
    leftimage: {type: String },
    leftimagezoom: {type: String},
    underimage: {type: String },
    underimagezoom: {type: String },
    behindimage: {type: String },
    behindimagezoom: {type: String },
    count_user_buy:{type:Number},
    count_user_search:{type:Number},
    amountproduct:{type:Number},
    checksale:{type:Boolean},
    checknew:{type:Boolean},
    promotion:{type:Number},
});

module.exports = mongoose.model('Product', ProductSchema);