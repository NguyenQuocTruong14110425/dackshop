const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// email validate
let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp =
            new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'E-mail must be at least 5 characters but no more than 30'
    },
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
]
//user name validate
let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};
let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};
const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'User name must be at least 3 characters but no more than 15'
    },
    {
        validator: validUsername,
        message: 'Username must not have any special characters'
    }
]
//password validate
let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};
let validPassword = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp =
            new RegExp(/^(?=.*?[a-z])(?=.*?[\d])(?=.*?[\w]).{8,35}$/);
        return regExp.test(password);
    }
};
const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters but no more than 35'
    },
    {
        validator: validPassword,
        message: 'Password must not have any special characters'
    }
]

// full name validate
let fullnameLengthChecker = (fullname) => {
    if (!fullname) {
        return false;
    } else {
        if (fullname.length < 3 || fullname.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};
let validFullname = (fullname) => {
    if (!fullname) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9\s]+$/);
        return regExp.test(fullname);
    }
};
const fullnameValidators = [
    {
        validator: fullnameLengthChecker,
        message: 'Full name must be at least 3 characters but no more than 30'
    },
    {
        validator: validFullname,
        message: 'Full name must not have any special characters'
    }
]
//address validate
let addressLengthChecker = (address) => {
    if (!address) {
        return false;
    } else {
        if (address.length < 3 || address.length > 50) {
            return false;
        } else {
            return true;
        }
    }
};
let validAddress = (address) => {
    if (!address) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[a-zA-Z0-9\s]+$/);
        return regExp.test(address);
    }
};
const addressValidators = [
    {
        validator: addressLengthChecker,
        message: 'Address user must be at least 3 characters but no more than 50'
    },
    {
        validator: validAddress,
        message: 'Address user must not have any special characters'
    }
]
//phone number validate
let numberphoneLengthChecker = (numberphone) => {
    if (!numberphone) {
        return false;
    } else {
        if (numberphone.length < 10 || numberphone.length > 11) {
            return false;
        } else {
            return true;
        }
    }
};
let validNumberphone = (numberphone) => {
    if (!numberphone) {
        return false;
    } else {
        const regExp =
            new RegExp(/^[0-9]+$/);
        return regExp.test(numberphone);
    }
};
const numberphoneValidators = [
    {
        validator: numberphoneLengthChecker,
        message: 'number phone user must be at least 10 characters but no more than 11'
    },
    {
        validator: validNumberphone,
        message: 'number phone user must number'
    }
]
var UserSchema = new Schema({
    email: { type: String, require: true, unique: true, lowercase: true, validate: emailValidators },
    fullname:{type:String,require:true,validate: fullnameValidators,lowercase: true},
    username: { type: String, require: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, require: true,validate: passwordValidators },
    address:{type:String,required:true,validate: addressValidators},
    numberphone:{type:String,required:true,validate: numberphoneValidators},
    diemtichluy:{type:Number}
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});
// Methods to compare password to encrypted password upon login
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
  };

module.exports = mongoose.model('User', UserSchema);