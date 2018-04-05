const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var BranchSchema = new Schema({
    BranchName: { type: String, require: true, lowercase: true },
    ImageBranch: { type: Schema.ObjectId },
    Description: { type: String, lowercase: true },
    QtyCatalog: { type: Number, default: 0},
    DateCreate: { type: Date },
    DateUpdate: { type: Date },
    MenuParent: { type: Schema.ObjectId, ref: 'Menu' },
    CatalogChild: [{ type: Schema.ObjectId, ref: 'Catalog' }]
});

module.exports = mongoose.model('Branch', BranchSchema);
