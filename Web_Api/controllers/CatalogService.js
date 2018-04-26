const Menu = require('../../Models/menu');
const Branch = require('../../Models/branch');
const Catalog = require('../../Models/catalog');
const Valid = require('../lib/Valid.js');
const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class CatalogService {
    constructor() { }
    // hàm tìm danh sách catalog
    findAllCatalog(callback) {
        Catalog.find()
            .populate({ path: "BranchParent" ,select: "_id BranchName QtyCatalog" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm tìm danh sách catalog theo id branch
    findCatalogByBranch(idparam, callback) {
        Branch.findById(idparam)
            .populate({ path: "CatalogChild" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data.CatalogChild);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm tìm catalog theo id catalog truyền vào
    findCatalogById(idparam, callback) {
        Catalog.findById(idparam)
            .populate({ path: "BranchParent", select: "_id BranchName QtyCatalog" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    }
    //hàm them mới một catalog
    addCatalog(CatalogModel, callback) {
        let DataSet = this.getDataCatalogForInsert(CatalogModel, CatalogModel.idbranch);
        Catalog.createAsync(DataSet)
            .then(function (catalogs) {
                var idCatalog = catalogs._id;
                Branch.findByIdAndUpdate(CatalogModel.idbranch,
                    { "$push": { "CatalogChild": idCatalog } },
                    { "new": true, "upsert": true })
                    .then(DataBranch => Branch.findByIdAndUpdate(DataBranch._id, { DateUpdate: new Date(), QtyCatalog: Number(DataBranch.CatalogChild.length) }))
                    .then(function (data) {
                        data = {
                            idNewCatalog: idCatalog
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
    //hàm xử lý cập nhật một catalog
    updateCatalog(CatalogModel, callback) {
        let dataSet = this.getDataCatalogForUpdate(CatalogModel, null);
        Catalog.findByIdAndUpdateAsync(CatalogModel._id,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa tất cả catalogs có trong branch
    removeAllCatalog(idparam, callback) {
        Branch.findByIdAsync(idparam)
            .then(function (branchs) {
                let countCatalog = Number(branchs.CatalogChild.length)
                for (let index in branchs.CatalogChild) {
                    if (index < countCatalog) {
                        Catalog.findByIdAndRemove(branchs.CatalogChild[index])
                            .catch(err => {
                                return callback(err.message);
                            })
                    }
                }
                Branch.findByIdAndUpdate(idparam, { DateUpdate: new Date(), CatalogChild: [], QtyCatalog: 0 })
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
    removeCatalog(idparam, callback) {
        Catalog.findByIdAndRemove(idparam)
            .then(function (catalogs) {
                var BranchParent = catalogs.BranchParent;
                Branch.findByIdAndUpdate(BranchParent,
                    { $pull: { CatalogChild: catalogs._id } },
                    { "new": true, "upsert": true })
                    .then(DataBranch => Branch.findByIdAndUpdate(DataBranch._id, { DateUpdate: new Date(), QtyCatalog: Number(DataBranch.CatalogChild.length) }))
                    .then(function (data) {
                        data = {
                            idOldParent: BranchParent
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
    getDataCatalogForInsert(data, IdBranch) {
        let newCatalog = new Catalog();
        newCatalog.CatalogName = data.CatalogName,
            newCatalog.ImageCatalog = Valid.getObjectIDIfValid(data.ImageCatalog),
            newCatalog.Description = data.Description,
            newCatalog.DateCreate = new Date(),
            newCatalog.DateUpdate = null,
            newCatalog.ProductChild = []
        if (IdBranch != null) {
            newCatalog.BranchParent = IdBranch
        }
        return newCatalog;
    }
    // hàm lấy data để cập nhật
    getDataCatalogForUpdate(data) {
        let catalog =
            {
                DateUpdate: new Date()
            }
        if (data.CatalogName) {
            catalog.CatalogName = data.CatalogName;
        }
        if (data.ImageCatalog) {
            catalog.ImageCatalog = Valid.getObjectIDIfValid(data.ImageCatalog);
        }
        if (data.Description) {
            catalog.Description = data.Description;
        }
        return catalog;
    }
    //
}

module.exports = new CatalogService();