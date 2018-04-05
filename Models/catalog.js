const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var CatalogSchema = new Schema({
    CatalogName: { type: String, require: true,lowercase: true },
    Description: { type: String,lowercase: true},
    ImageCatalog: {type: Schema.ObjectId},
    QtyProduct: {type:Number,default: 0},
    DateCreate: { type: Date },
    DateUpdate: { type: Date },
    BranchParent : { type: Schema.ObjectId, ref: 'Branch' },
    ProductChild : [{ type: Schema.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Catalog', CatalogSchema);
