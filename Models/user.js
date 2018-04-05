const mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    Email: { type: String, require: true, unique: true, lowercase: true },
    FullName: { type: String, lowercase: true },
    UserName: { type: String, require: true, unique: true, lowercase: true },
    Password: { type: String, require: true },
    Address: { type: String },
    Gender: { type: String },
    Age: { type: Number },
    NumberPhone: { type: String },
    DaskPoint: { type: Number, default: 0 },
    DateCreate: { type: Date },
    DateUpdate: { type: Date },
    Promotion: [{ type: Schema.ObjectId, ref: 'Promotion' }],
    TopSuggestion: {
        Products: [{
            IdProduct: { type: Schema.ObjectId, ref: 'Product' },
            CountView: { type: Number, default: 0 }
        }],
        Catalogs: [{
            IdCatalog: { type: Schema.ObjectId, ref: 'Catalog' },
            CountView: { type: Number, default: 0 }
        }],
        TopFilter: {
            Size: [{ type: String }],
            Color: [{ type: String }],
            Price: [{ type: String }],
            Gender: [{ type: String }],
        }

    },
    IsDelete: { type: Boolean, default: false },
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('Password'))
        return next();

    bcrypt.hash(this.Password, null, null, (err, hash) => {
        if (err) return next(err);
        this.Password = hash;
        next();
    });
});
// Methods to compare password to encrypted password upon login
UserSchema.methods.comparePassword = function (Password) {
    return bcrypt.compareSync(Password, this.Password); // Return comparison of login password to password in database (true or false)
};

module.exports = mongoose.model('User', UserSchema);