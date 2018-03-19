const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// catalogName validate
let menuNameLengthChecker = (menuName) => {
    if (!menuName) {
        return false;
    } else {
        if (menuName.length < 3 || menuName.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};
let validMenuName = (menuName) => {
    if (!menuName) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9\s]+$/);
        return regExp.test(menuName);
    }
};
const menuNameValidators = [
    {
        validator: menuNameLengthChecker,
        message: 'Catalog name must be at least 3 characters but no more than 30'
    },
    {
        validator: validMenuName,
        message: 'Catalog name must not have any special characters'
    }
]


var MenuSchema = new Schema({
    menuname: { type: String,lowercase: true, validate:menuNameValidators},
    branches : [{ type: Schema.ObjectId, ref: 'Branch' }]
});

module.exports = mongoose.model('Menu', MenuSchema);