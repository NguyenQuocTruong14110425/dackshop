const Color = require('../../Models/Color');
const Valid = require('../lib/Valid.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class ColorService {
    constructor() { }
    //hàm tìm tất cả Color
    findAllColor(callback) {
        Color.find()
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một Color theo id tuyền vào
    findColorById(idparam, callback) {
        Color.findById(idparam)
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một Color
    addColor(ColorModel, callback) {
        let DataSet = this.getDataColorForInsert(ColorModel);
        Color.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một Color
    updateColor(ColorModel, callback) {
        let dataSet = this.getDataColorForUpdate(ColorModel);
        Color.findByIdAndUpdateAsync(ColorModel._id,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa một Color
    removeColor(idparam, callback) {
        Color.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm lấy dữ liệu khi thêm mới
    getDataColorForInsert(data) {
        let newColor = new Color();
        newColor.ColorName = data.ColorName,
            newColor.ValueHex = data.ValueHex
        return newColor;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataColorForUpdate(data) {
        let Color ={}
        if (data.ColorName) {
            Color.ColorName = data.ColorName;
        }
        if (data.ValueHex) {
            Color.ValueHex = data.ValueHex;
        }
        if (data.IsDelete!==undefined) {
            Color.IsDelete = data.IsDelete;
        }
        return Color;
    }

}

module.exports = new ColorService();