var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Cart: {
        items: [{
            item: {
                Product: {
                    _id: { type: Schema.ObjectId, ref: 'Product' },
                    ProductName: { type: String },
                    Image: { type: String },
                    ShortDescription: { type: String },
                    Price: { type: Number, default: 0 },
                    Qty: { type: Number, default: 0 },
                    Size: { type: String },
                    Color: { type: String }
                },
                Promotion: {
                    _id: { type: String },
                    PromotionName: { type: String },
                    Value: { type: Number },
                    Coupon: { type: String },
                    SaleEndDate: { type: Date },
                    TypePromotion: { type: String },
                }
            },
            totalPrice: { type: Number, default: 0 },
            totalQty: { type: Number, default: 0 },
        }],
        totalOrder: { type: Number, default: 0 },
        totalQtyOrder: { type: Number, default: 0 }
    },
    Address: { type: String, required: true },
    Email: { type: String, required: true },
    FullName: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    DateOrder: { type: Date },
    DateUpdate: { type: Date },
    PaymentType: { type: String },
    Shipping: {
        IdShipping: { type: Schema.ObjectId, ref: 'Shipping' },
        StatusTracking: { type: String, default: 'Order unConfirm' }
    },
    IsDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', schema);