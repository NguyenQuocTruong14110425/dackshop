const EnumConstant = require('../../Web_Config/EnumConstant.js');
var fs = require('fs');
const Temp1 = require('../../Models/temp1');

module.exports = function PushObject(model) {
    var ModelTemp ={
        name: model.name2||"",
        tempQty: model.tempQty || 0
    }
    
    this.setModel= function(name) {
        ModelTemp.name = name; 
        ModelTemp.tempQty++;
        };
    this.getModel = function() { return ModelTemp; };
}

