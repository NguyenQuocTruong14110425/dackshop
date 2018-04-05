const config = require('../Web_Config/database');
const BranchService = require('./controllers/BranchService');
const MenuService = require('./controllers/MenuService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');

module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;
       // Tìm tất cả branch có trong menu có id menu là  Idpram truyền vào
       router.get('/branch/all/:idparam', (req, res) => {
        BranchService.findBranchByMenu(req.params.idparam, function (err, branchs) {
            if (err) {
                res.json({ message: err ? err : mess.SaveSuccess });
            } else {
                res.json({ message: mess.SearchSuccess, data: branchs });
            }

        });
    });

    // Tìm một branch bất kỳ co Idpram truyền vào
    router.get('/branch//detail/:idparam', (req, res) => {
        BranchService.findBranchById(req.params.idparam, function (err, branchs) {
            if (err) {
                res.json({ message: err ? err : mess.AddFail });
            } else {
                res.json({ message: mess.SearchSuccess, data: branchs });
            }

        });
    });
    // thêm mới một branch vào môt menu với Id menu là Idpram truyền vào
    router.post('/branch/add/:idparam', (req, res) => {
        BranchService.addBranch(req.params.idparam, req.body, function (err, databranchs) {
            if (err) {
                res.json({ message: err ? err : mess.AddFail });
            } else {
                BranchService.findBranchById(databranchs.idNewBranch, function (err, branchs) {
                    if (err) {
                        res.json({ message: err ? err : mess.AddFail });
                    } else {
                        res.json({ message: mess.AddSuccess, data: branchs });
                    }

                });
            }

        });
    });


    //cập nhật một branch bất kỳ với id là idparam truyên vào
    router.put('/branch/update/:idparam', (req, res) => {
        BranchService.updateBranch(req.params.idparam, req.body, function (err, databranchs) {
            if (err) {
                res.json({ message: err ? err : mess.UpdateFail });
            } else {
                BranchService.findBranch(req.params.idparam, function (err, branchs) {
                    if (err) {
                        res.json({ message: err ? err : mess.UpdateFail });
                    } else {
                        res.json({ message: mess.UpdateSuccess, data: branchs });
                    }

                });
            }

        });
    });
    // xóa một branch nằm trong một menu bất kỳ với id menu là id param truyền vào
    router.delete('/branch/delete/:idparam', (req, res) => {
        BranchService.removeBranch(req.params.idparam, function (err, branchs) {
            if (err) {
                res.json({ message: err ? err : mess.RemoveFail });
            } else {
                MenuService.findMenuById(branchs.idOldParent, function (err, menus) {
                    if (err) {
                        res.json({ message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ message: mess.RemoveSuccess, data: menus });
                    }

                });
            }

        });
    });
    //xóa tất cả branch nằm trong một menu bất kỳ với id menu là idparam truyền vào
    router.delete('/branch/removeall/:idparam', (req, res) => {
        BranchService.removeAllBranch(req.params.idparam, function (err, data) {
            if (err) {
                res.json({ message: err ? err : mess.RemoveFail });
            } else {
                MenuService.findMenuById(req.params.idparam, function (err, menus) {
                    if (err) {
                        res.json({ message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ message: mess.RemoveSuccess, data: menus });
                    }

                });
            }

        });
    });


    return router;
}