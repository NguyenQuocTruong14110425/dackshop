const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var SizeSchema = new Schema({
    SizeName: { type: String, require: true, unique: true, lowercase: true },
    TypeSize: { type: String, lowercase: true },
    IsDelete: { type: Boolean, default: false },
});


module.exports = mongoose.model('Size', SizeSchema);