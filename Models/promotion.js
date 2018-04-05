const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var PromotionSchema = new Schema({
  PromotionName: { type: String, require: true, lowercase: true },
  Description: { type: String, lowercase: true },
  Value: { type: Number },
  SaleEndDate: { type: Date },
  TypePromotion: { type: String, lowercase: true },
  DateCreate: { type: Date },
  DateUpdate: { type: Date },
  IsActive: { type: Boolean, default: true },
  IsDelete: { type: Boolean, default: false },
});


module.exports = mongoose.model('Promotion', PromotionSchema);