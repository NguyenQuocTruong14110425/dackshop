const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var FolderSchema = new Schema({
  FolderName: { type: String, require: true, lowercase: true },
  Location: { type: String},
  Size: { type: Number,default:0},
  Contains: { type: Number,default:0},
  DateCreate: { type: Date },
  DateUpdate: { type: Date },
  ImageChild: [{ type: Schema.ObjectId, ref: 'Image' }]
});

module.exports = mongoose.model('Folder', FolderSchema);