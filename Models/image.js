const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var ImageSchema = new Schema({
  ImageName: { type: String, require: true, lowercase: true },
  IdUrl: { type: String},
  ImageLocal:{ data: Buffer, contentType: String },
  DateCreate: { type: Date },
  DateUpdate: { type: Date },
  IsDelete: { type: Boolean, default: true },
  FolderParent: { type: Schema.ObjectId, ref: 'Folder' },
});

module.exports = mongoose.model('Image', ImageSchema);