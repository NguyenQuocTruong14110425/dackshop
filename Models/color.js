const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var ColorSchema = new Schema({
  ColorName: { type: String, require: true,unique: true, lowercase: true },
  ValueHex: { type: String},
  IsDelete: { type: Boolean, default: false},
});


module.exports = mongoose.model('Color', ColorSchema);