const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var MenuSchema = new Schema({
  MenuName: { type: String, require: true, lowercase: true },
  QtyBranch: { type: Number, default: 0 },
  DateCreate: { type: Date },
  DateUpdate: { type: Date },
  IsActive: { type: Boolean, default: true },
  BranchChild: [{ type: Schema.ObjectId, ref: 'Branch' }]
});

MenuSchema.methods = {
  addBranchChild: function (child) {
    var that = this;
    return this.model('Menu').update(child).addCallback(function (child) {
      that.BranchChild.push(child._id);
      that.save();
    });
  }
}


module.exports = mongoose.model('Menu', MenuSchema);