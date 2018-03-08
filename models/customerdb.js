const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    fullname: { 
        type: String,
        require: true, 
        },
        address:{
            type:String,
            require: true
        },
        birthday:{
            type:String,
            require: true
        },
    numberphone:{
        type:String,
        require:true,
        }
    
});
module.exports = mongoose.model('Customer', CustomerSchema);