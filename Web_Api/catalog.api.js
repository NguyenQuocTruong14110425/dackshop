const config = require('../Web_Config/database');
const BranchService = require('./controllers/BranchService');
const CatalogService = require('./controllers/CatalogService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;
    // Tìm tất cả catalog có trong branch có id branch là  Idpram truyền vào
    router.get('/catalog/allcatalog/', (req, res) => {
        CatalogService.findAllCatalog(function (err, catalogs) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SaveSuccess });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: catalogs });
            }

        });
    });
    // Tìm tất cả catalog có trong branch có id branch là  Idpram truyền vào
    router.get('/catalog/all/:idparam', (req, res) => {
        CatalogService.findCatalogByBranch(req.params.idparam, function (err, catalogs) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SaveSuccess });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: catalogs });
            }

        });
    });

    // Tìm một catalog bất kỳ co Idpram truyền vào
    router.get('/catalog/detail/:idparam', (req, res) => {
        CatalogService.findCatalogById(req.params.idparam, function (err, catalogs) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: catalogs });
            }

        });
    });
    // thêm mới một catalog vào môt branch với Id branch là Idpram truyền vào
    router.post('/catalog/add/', (req, res) => {
        CatalogService.addCatalog(req.body, function (err, datacatalogs) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                CatalogService.findCatalogById(datacatalogs.idNewCatalog, function (err, catalogs) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.AddFail });
                    } else {
                        res.json({ success: true, message: mess.AddSuccess, data: catalogs });
                    }

                });
            }

        });
    });


    //cập nhật một catalog bất kỳ với id là idparam truyên vào
    router.put('/catalog/update/', (req, res) => {
        CatalogService.updateCatalog( req.body, function (err, datacatalogs) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.UpdateFail });
            } else {
                CatalogService.findCatalogById(req.body._id, function (err, catalogs) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.UpdateFail });
                    } else {
                        res.json({ success: true, message: mess.UpdateSuccess, data: catalogs });
                    }

                });
            }

        });
    });
    // xóa một catalog nằm trong một branch bất kỳ với id branch là id param truyền vào
    router.delete('/catalog/delete/:idparam', (req, res) => {
        CatalogService.removeCatalog(req.params.idparam, function (err, catalogs) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                BranchService.findBranchById(catalogs.idOldParent, function (err, branchs) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ success: true, message: mess.RemoveSuccess, data: branchs });
                    }

                });
            }

        });
    });
    //xóa tất cả catalog nằm trong một menu bất kỳ với id branch là idparam truyền vào
    router.delete('/catalog/removeall/:idparam', (req, res) => {
        CatalogService.removeAllCatalog(req.params.idparam, function (err, data) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                BranchService.findBranchById(req.params.idparam, function (err, branhcs) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ success: true, message: mess.RemoveSuccess, data: branhcs });
                    }

                });
            }

        });
    });
    return router;
}