const Menu = require('../../Models/menu');
const Branch = require('../../Models/branch');
const Catalog = require('../../Models/catalog');
const Valid = require('../lib/Valid.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class MenuService {
    constructor() { }
       //hàm tìm tất cả menu
       findAllMenu(callback) {
        Menu.find()
            .populate({ path: "BranchChild", select: "_id BranchName Description QtyCatalog CatalogChild" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một menu theo id tuyền vào
    findMenuById(idparam, callback) {
        Menu.findById(idparam)
            .populate({ path: "BranchChild", select: "_id BranchName Description QtyCatalog CatalogChild" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một menu
    addMenu(MenuModel, callback) {
        let DataSet = this.getDataMenuForInsert(MenuModel);
        Menu.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một menu
    updateMenu(MenuModel, callback) {
        let dataSet = this.getDataMenuForUpdate(MenuModel, null);
        Menu.findByIdAndUpdateAsync(MenuModel._id,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
//hàm xóa một menu
    removeMenu(idparam, callback) {
        Menu.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm lấy dữ liệu khi thêm mới
    getDataMenuForInsert(data) {
        let newMenu = new Menu();
        newMenu.MenuName = data.MenuName,
            newMenu.DateCreate = new Date(),
            newMenu.DateUpdate = null,
            newMenu.BranchChild = []
        return newMenu;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataMenuForUpdate(data, idBranch) {
        let menu =
            {
                DateUpdate: new Date()
            }
        if (data.MenuName) {
            menu.MenuName = data.MenuName;
        }
        if (idBranch) {
            menu.BranchChild.push(idBranch);
        }
        if (data.IsActive!==undefined) {
            menu.IsActive=data.IsActive;
        }
        return menu;
    }

}

module.exports = new MenuService();