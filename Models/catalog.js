const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;



//countProductInCatalog validate
var countProductInCatalogCheck = (countProductInCatalog) => {
    if (!countProductInCatalog) {
        return false;
    } 
    else {
        if (countProductInCatalog <= 0) {
            return false;
        } 
        else {
            return true;
        }
    }
};
var countProductInCatalogValidator = [
    {
        validator: countProductInCatalogCheck,
        message: 'countProductInCatalog must be greater than zero'
    }
]

// catalogName validate
let catalogNameLengthChecker = (catalogName) => {
    if (!catalogName) {
        return false;
    } else {
        if (catalogName.length < 3 || catalogName.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};
let validCatalogName = (catalogName) => {
    if (!catalogName) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9\s]+$/);
        return regExp.test(catalogName);
    }
};
const catalogNameValidators = [
    {
        validator: catalogNameLengthChecker,
        message: 'Catalog name must be at least 3 characters but no more than 30'
    },
    {
        validator: validCatalogName,
        message: 'Catalog name must not have any special characters'
    }
]


var CatalogSchema = new Schema({
    catalogName: { type: String, require: true, unique: true,lowercase: true,validate:catalogNameValidators },
    countProductInCatalog: {type:Number,require:true, validate: countProductInCatalogValidator,lowercase: true},
    idBranch:{ type: Schema.ObjectId, ref: 'Branch'},
    products:[
        {
       _id: Schema.ObjectId
        }
    ]
});

module.exports = mongoose.model('Catalog', CatalogSchema);