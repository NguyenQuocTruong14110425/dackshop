const Menu = require('../../Models/menu');
const Branch = require('../../Models/branch');
const Catalog = require('../../Models/catalog');

var middler = require('./middleware.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;


// lấy danh sách tất cả menu
exports.FindAllMenu = function (req, res) {
    Menu.find().sort({ QtyBranch: 1 }).populate({ path: "BranchChild" }).exec()
        .then(middler.responseWithResult(res))
        .catch(middler.handleError(res));
};

//lấy một menu theo id truyền vào: mặc định là  req.params.idparam
exports.FindMenuById = function (req, res) {
    Menu.findById({
        _id: req.params.idparam
    })
        .populate({ path: "BranchChild" })
        .execAsync()
        .then(middler.handleEntityNotFound(res))
        .then(function (entity) {
            if (entity) {
                res.status(200).json({ data: entity });
            }
        })
        .catch(middler.handleError(res));
};

// tạo mới một đối tượng menu vào database, lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
exports.AddMenu = function (req, res) {
    Menu.createAsync(req.body)
        .then(middler.responseWithResult(res))
        .catch(middler.handleError(res));
};

// cập nhật một đối tượng menu trong database, lưu ý: req.body truyền vào phải tương ứng với Entity name trong model
exports.UpdateMenu = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Menu.findByIdAsync(req.params.idparam)
        .then(middler.handleEntityNotFound(res))
        .then(middler.saveUpdates(req.body))
        .then(middler.responseWithResult(res))
        .catch(middler.handleError(res));
};


// xóa một đối tượng menu trong database, lưu ý: req.body truyền vào phải tương ứng với Entity name trong model
exports.RemoveItemMenu = function (req, res) {
    Menu.findByIdAsync(req.params.idparam)
        .then(middler.handleEntityNotFound(res))
        .then(middler.removeEntity(res))
        .catch(middler.handleError(res));
};

var findMenuById = function (id, callback) {
    Menu.findById({ _id: id }, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    });
};

exports.AddBranch = function (req, res) {
    req.body.IdMenu = req.params.idparam;
    Branch.createAsync(req.body)
        .then(middler.handleEntityNotFound(res))
        .then(function (branchs) {
            Menu.findByIdAndUpdate(req.params.idparam,
                { "$push": { "BranchChild": branchs._id } },
                { "new": true, "upsert": true })
                .then(DataMenu => Menu.findByIdAndUpdate(DataMenu._id, { QtyBranch: Number(DataMenu.BranchChild.length) }))
                .then(middler.responseWithResult(res))
        })
        .then(middler.responseWithResult(res))
        .catch(middler.handleError(res))

}

exports.RemoveBranch = function (req, res) {
    Branch.findByIdAndRemove(req.params.idparam)
        .then(function (branchs) {
            Menu.findByIdAndUpdateAsync(branchs.IdMenu,
                { $pull: { BranchChild: branchs._id } },
                { "new": true, "upsert": true })
                .then(DataMenu => Menu.findByIdAndUpdateAsync(DataMenu._id, { QtyBranch: Number(DataMenu.BranchChild.length) }))
                .then(middler.responseWithResult(res))
        })
        .then(middler.responseWithResult(res))
        .catch(middler.handleError(res))
}

exports.RemoveAllBranch = function (req, res) {
    Menu.findByIdAsync(req.params.idparam)
        .then(middler.handleEntityNotFound(res))
        .then(function (menus) {
            for (let index in menus.BranchChild) {
                if (index >= 0) {
                    console.log(menus.BranchChild[index]);
                    Branch.findByIdAndRemoveAsync(menus.BranchChild[index])
                        .then(
                            Menu.findByIdAndUpdateAsync(req.params.idparam,
                                { $pull: { BranchChild: menus.BranchChild[index] } },
                                { "new": true, "upsert": true })
                                .then(DataMenu => Menu.findByIdAndUpdateAsync(DataMenu._id, { QtyBranch: Number(DataMenu.BranchChild.length) }))
                                .then(middler.responseWithResult(res))
                                .catch(middler.handleError(res))
                        )
                }
                else {
                    return Promise.reject('Invalid identifier');
                }
            }
        }
        )
}

