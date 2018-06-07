const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var ProductSchema = new Schema({
    ProductName: { type: String, require: true, lowercase: true },
    ShortDescription: { type: String, lowercase: true },
    LongDescription: { type: String, lowercase: true },
    Size: [{
        IdSize: { type: Schema.ObjectId, ref: 'Size' },
        IsActive: { type: Boolean, default: false }
    }],
    Color: [{
        IdColor: { type: Schema.ObjectId, ref: 'Color' },
        IsActive: { type: Boolean, default: false }
    }],
    AmountProduct: { type: Number, default: 0 },
    Price: { type: Number, default: 0 },
    SalePrice: { type: Number, default: 0 },
    Image: {
        LeftImage: { type: Schema.ObjectId, ref: 'Image' },
        LeftImageZoom: { type: Schema.ObjectId, ref: 'Image' },
        RightImage: { type: Schema.ObjectId, ref: 'Image' },
        RightImageZoom: { type: Schema.ObjectId, ref: 'Image' },
        UnderImage:{ type: Schema.ObjectId, ref: 'Image' },
        UnderImageZoom: { type: Schema.ObjectId, ref: 'Image' },
    },
    DateCreate: { type: Date },
    DateUpdate: { type: Date },
    CheckNew: { type: Boolean, default: false },
    CountUserView: { type: Number, default: 0 },
    CountUserBuy: { type: Number, default: 0 },
    Comment: [{
        User: { type: Schema.ObjectId, ref: 'User' },
        Content: { type: String, lowercase: true },
        DatePosted: { type: Date },
        Image: { type: String },
        RateComment: { type: Number , default: 0},
        Rate: { type: Number , default: 0}
    }],
    Rate: {
        OneStar: { type: Number, default: 0 },
        TwoStar: { type: Number, default: 0 },
        ThreeStar: { type: Number , default: 0},
        FourStar: { type: Number, default: 0 },
        FiveStar: { type: Number, default: 0 },
        TotalRate: { type: Number, default: 0 },
        AvgRate: { type: Number, default: 0 },
    },
    IsDelete: { type: Boolean, default: false },
    IsActive: { type: Boolean, default: false },
    Onsale: { type: Boolean, default: false },
    Promotion: [{ type: Schema.ObjectId, ref: 'Promotion' }],
    CatalogParent: { type: Schema.ObjectId, ref: 'Catalog' },
    Suggestions: { type: Schema.ObjectId, ref: 'Suggestion' },
});

module.exports = mongoose.model('Product', ProductSchema);