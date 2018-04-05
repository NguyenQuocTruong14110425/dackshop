const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt-nodejs');
class Valid {
    constructor() { }

    getObjectIDIfValid(value) {
        return ObjectID.isValid(value)
            ? new ObjectID(value)
            : null;
    }

    hashPassword(Password)
    {
       return bcrypt.hashSync(Password)!=null
       ?bcrypt.hashSync('123')
       :bcrypt.hashSync(Password)
    }
    //
    comparePassword(Password,hasPassword) {
        return bcrypt.compare(Password, hasPassword, function(err, res) {
               return res;
        });
    };

}
module.exports = new Valid();