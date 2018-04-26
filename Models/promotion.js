const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var PromotionSchema = new Schema({
  PromotionName: { type: String, require: true, lowercase: true },
  Description: { type: String, lowercase: true },
  Value: { type: Number },
  Coupon: [{ type: String }],
  AmountCounpon: { type: Number },
  SaleStartDate: { type: Date },
  SaleEndDate: { type: Date },
  TypePromotion: { type: String, lowercase: true },
  ApplyFor: {
    nameApply:{ type: String, lowercase: true },
    valueApply:{ type: String }
  },
  DateCreate: { type: Date },
  DateUpdate: { type: Date },
  IsActive: { type: Boolean, default: true },
  IsDelete: { type: Boolean, default: false },
});


module.exports = mongoose.model('Promotion', PromotionSchema);