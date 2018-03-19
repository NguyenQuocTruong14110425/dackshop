const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
//countCatalogBranch validate
var countCatalogBranchCheck = (countCatalogBranch) => {
    if (!countCatalogBranch) {
        return false;
    } 
    else {
        if (countCatalogBranch <= 0) {
            return false;
        } 
        else {
            return true;
        }
    }
};
var countCatalogBranchValidator = [
    {
        validator: countCatalogBranchCheck,
        message: 'countCatalogBranch must be greater than zero'
    }
]

// branchName validate
let branchNameLengthChecker = (branchName) => {
    if (!branchName) {
        return false;
    } else {
        if (branchName.length < 3 || branchName.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};
let validBranchName = (branchName) => {
    if (!branchName) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9\s]+$/);
        return regExp.test(branchName);
    }
};
const branchNameValidators = [
    {
        validator: branchNameLengthChecker,
        message: 'Brand name must be at least 3 characters but no more than 30'
    },
    {
        validator: validBranchName,
        message: 'Brand name must not have any special characters'
    }
]

// image validate
let imageLengthChecker = (image) => {
    if (!image) {
        return false;
    } else {
        if (image.length < 3 || image.length > 200) {
            return false;
        } else {
            return true;
        }
    }
};
let validImage = (image) => {
    if (!image) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9\s]+$/);
        return regExp.test(image);
    }
};
const imageValidators = [
    {
        validator: imageLengthChecker,
        message: 'Image must be at least 3 characters but no more than 200'
    },
    {
        validator: validImage,
        message: 'Image must not have any special characters'
    }
]


// description validate
let descriptionLengthChecker = (description) => {
    if (!description) {
        return false;
    } else {
        if (description.length < 3 || description.length > 200) {
            return false;
        } else {
            return true;
        }
    }
};
let validDescription= (description) => {
    if (!description) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9\s]+$/);
        return regExp.test(description);
    }
};
const imageDescription = [
    {
        validator: descriptionLengthChecker,
        message: 'Description must be at least 3 characters but no more than 200'
    },
    {
        validator: validDescription,
        message: 'Description must not have any special characters'
    }
]

var BranchSchema = new Schema({
    branchName: { type: String, require: true, unique: true,lowercase: true, validate: branchNameValidators },
    image: { type: String, require: true,lowercase: true, validate: imageValidators  },
    description: { type: String, require: true,lowercase: true, validate: imageDescription },
    countCatalogBranch: { type: Number, validate: countCatalogBranchValidator,lowercase: true, validate: countCatalogBranchValidator },
    idmenu:{ type: Schema.ObjectId, ref: 'Menu'},
    cataloges : [{ type: Schema.ObjectId, ref: 'Catalog' }]
});


module.exports = mongoose.model('Branch', BranchSchema);