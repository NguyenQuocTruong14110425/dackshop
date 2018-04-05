const Shipping = require('../../Models/Shipping');
const Valid = require('../lib/Valid.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class ShippingService {
    constructor() { }
    //hàm tìm tất cả Shipping
    findAllShipping(callback) {
        Shipping.find()
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một Shipping theo id tuyền vào
    findShippingById(idparam, callback) {
        Shipping.findById(idparam)
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một Shipping
    addShipping(ShippingModel, callback) {
        let DataSet = this.getDataShippingForInsert(ShippingModel);
        Shipping.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một Shipping
    updateShipping(idparam, ShippingModel, callback) {
        let dataSet = this.getDataShippingForUpdate(ShippingModel, null);
        Shipping.findByIdAndUpdateAsync(idparam,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa một Shipping
    removeShipping(idparam, callback) {
        Shipping.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm lấy dữ liệu khi thêm mới
    getDataShippingForInsert(data) {
        let newShipping = new Shipping();
        newShipping.ShippingType = data.ShippingType,
            newShipping.LocationLimit = []
        return newShipping;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataShippingForUpdate(data) {
        let Shipping ={}
        if (data.ShippingType) {
            Shipping.ShippingType = data.ShippingType;
        }
        if (data.Price) {
            Shipping.Price = data.Price;
        }
        return Shipping;
    }

}

module.exports = new ShippingService();