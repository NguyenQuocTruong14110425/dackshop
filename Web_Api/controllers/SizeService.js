const Size = require('../../Models/Size');
const Valid = require('../lib/Valid.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class SizeService {
    constructor() { }
    //hàm tìm tất cả Size
    findAllSize(callback) {
        Size.find()
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một Size theo id tuyền vào
    findSizeById(idparam, callback) {
        Size.findById(idparam)
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một Size
    addSize(SizeModel, callback) {
        let DataSet = this.getDataSizeForInsert(SizeModel);
        Size.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một Size
    updateSize(idparam, SizeModel, callback) {
        let dataSet = this.getDataSizeForUpdate(SizeModel, null);
        Size.findByIdAndUpdateAsync(idparam,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa một Size
    removeSize(idparam, callback) {
        Size.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm lấy dữ liệu khi thêm mới
    getDataSizeForInsert(data) {
        let newSize = new Size();
        newSize.SizeName = data.SizeName,
            newSize.TypeSize = data.TypeSize
        return newSize;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataSizeForUpdate(data) {
        let Size ={}
        if (data.SizeName) {
            Size.SizeName = data.SizeName;
        }
        if (data.TypeSize) {
            Size.TypeSize = data.TypeSize;
        }
        if (data.IsDelete) {
            Size.IsDelete = data.IsDelete;
        }
        return Size;
    }

}

module.exports = new SizeService();