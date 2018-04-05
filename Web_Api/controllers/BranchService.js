const Menu = require('../../Models/menu');
const Branch = require('../../Models/branch');
const Catalog = require('../../Models/catalog');
const Valid = require('../lib/Valid.js');
const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class BranchService {
    constructor() { }
    // hàm tìm danh sách branch theo id menu
    findBranchByMenu(idparam, callback) {
        Menu.findById(idparam)
            .populate({ path: "BranchChild" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data.BranchChild);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm tìm branchs theo id branch truyền vào
    findBranchById(idparam, callback) {
        Branch.findById(idparam)
            .populate({ path: "MenuParent", select: "_id MenuName QtyBranch" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    }
    //hàm them mới một branch
    addBranch(idparam, BranchModel, callback) {
        let DataSet = this.getDataBranchForInsert(BranchModel, idparam);
        Branch.createAsync(DataSet)
            .then(function (branchs) {
                var idBranch = branchs._id;
                Menu.findByIdAndUpdate(idparam,
                    { "$push": { "BranchChild": idBranch } },
                    { "new": true, "upsert": true })
                    .then(DataMenu => Menu.findByIdAndUpdate(DataMenu._id, { DateUpdate: new Date(), QtyBranch: Number(DataMenu.BranchChild.length) }))
                    .then(function (data) {
                        data = {
                            idNewBranch: idBranch
                        }
                        if (data == null || data == undefined) return callback(mess.AddFail);
                        return callback(null, data);
                    })
                    .catch(err => {
                        return callback(err.message);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xử lý cập nhật một branch
    updateBranch(idparam, BranchModel, callback) {
        let dataSet = this.getDataBranchForUpdate(BranchModel, null);
        Branch.findByIdAndUpdateAsync(idparam,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa tất cả branch có trong menu
    removeAllBranch(idparam, callback) {
        Menu.findByIdAsync(idparam)
            .then(function (menus) {
                let countBranch = Number(menus.BranchChild.length)
                for (let index in menus.BranchChild) {
                    if (index < countBranch) {
                        Branch.findByIdAndRemove(menus.BranchChild[index])
                            .catch(err => {
                                return callback(err.message);
                            })
                    }
                }
                Menu.findByIdAndUpdate(idparam, { DateUpdate: new Date(), BranchChild: [], QtyBranch: 0 })
                    .then(function (data) {
                        if (data == null || data == undefined) return callback(mess.RemoveFail);
                        return callback(null, data);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xó một branch bất kỳ
    removeBranch(idparam, callback) {
        Branch.findByIdAndRemove(idparam)
            .then(function (branchs) {
                var MenuParent = branchs.MenuParent;
                Menu.findByIdAndUpdate(MenuParent,
                    { $pull: { BranchChild: branchs._id } },
                    { "new": true, "upsert": true })
                    .then(DataMenu => Menu.findByIdAndUpdate(DataMenu._id, { DateUpdate: new Date(), QtyBranch: Number(DataMenu.BranchChild.length) }))
                    .then(function (data) {
                        data = {
                            idOldParent: MenuParent
                        }
                        if (data == null || data == undefined) return callback(mess.RemoveFail);
                        return callback(null, data);
                    })
                    .catch(err => {
                        return callback(err.message);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };

    // hàm lấy data để thêm mới
    getDataBranchForInsert(data, IdMenu) {
        let newBranch = new Branch();
        newBranch.BranchName = data.BranchName,
            newBranch.ImageBranch = Valid.getObjectIDIfValid(data.ImageBranch),
            newBranch.Description = data.Description,
            newBranch.DateCreate = new Date(),
            newBranch.DateUpdate = null,
            newBranch.CatalogChild = []
        if (IdMenu != null) {
            newBranch.MenuParent = IdMenu
        }
        return newBranch;
    }
    // hàm lấy data để cập nhật
    getDataBranchForUpdate(data) {
        let branch =
            {
                DateUpdate: new Date()
            }
        if (data.BranchName) {
            branch.BranchName = data.BranchName;
        }
        if (data.ImageBranch) {
            branch.ImageBranch = Valid.getObjectIDIfValid(data.ImageBranch);
        }
        if (data.Description) {
            branch.Description = data.Description;
        }
        return branch;
    }
    //
}

module.exports = new BranchService();