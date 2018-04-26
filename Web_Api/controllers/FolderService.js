const Folder = require('../../Models/folder');
const Image = require('../../Models/image');
const Valid = require('../lib/Valid.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class FolderService {
    constructor() { }
       //hàm tìm tất cả Folder
       findAllFolder(callback) {
        Folder.find()
            .populate({ path: "ImageChild", select: "_id ImageName IdUrl" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một Folder theo id tuyền vào
    findFolderById(idparam, callback) {
        Folder.findById(idparam)
            .populate({ path: "ImageChild", select: "_id ImageName IdUrl" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một Folder
    addFolder(FolderModel, callback) {
        let DataSet = this.getDataFolderForInsert(FolderModel);
        Folder.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một Folder
    updateFolder(FolderModel, callback) {
        let dataSet = this.getDataFolderForUpdate(FolderModel, null);
        Folder.findByIdAndUpdateAsync(FolderModel._id,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
//hàm xóa một Folder
    removeFolder(idparam, callback) {
        Folder.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm lấy dữ liệu khi thêm mới
    getDataFolderForInsert(data) {
        let newFolder = new Folder();
        newFolder.FolderName = data.FolderName,
            newFolder.DateCreate = new Date(),
            newFolder.DateUpdate = null,
            newFolder.ImageChild = []
        return newFolder;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataFolderForUpdate(data, idImage) {
        let Folder =
            {
                DateUpdate: new Date()
            }
        if (data.FolderName) {
            Folder.FolderName = data.FolderName;
        }
        if (data.Size) {
            Folder.Size = data.Size;
        }
        if (data.Contains) {
            Folder.Contains = data.Contains;
        }
        if (idImage) {
            Folder.ImageChild.push(idImage);
        }
        if (data.IsActive!==undefined) {
            Folder.IsActive=data.IsActive;
        }
        return Folder;
    }

}

module.exports = new FolderService();