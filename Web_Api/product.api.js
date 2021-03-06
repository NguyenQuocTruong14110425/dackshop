const config = require('../Web_Config/database');
const CatalogService = require('./controllers/CatalogService');
const ProductDomain = require('./business/Product.Domain');
const ProductService = require('./controllers/ProductService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;
    // Tìm tất cả product có trong catalog có id catalog là  Idpram truyền vào
    router.get('/product/countproduct/', (req, res) => {
        var ProductConfig = new ProductDomain();
        var Dataconfig =  ProductConfig.AnalyzeProduct(function (err, result) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, data: result });
            }
        })
    });
    // Tìm tất cả product có trong catalog có id catalog là  Idpram truyền vào
    router.get('/product/all', (req, res) => {
        var paging = {
            page:1,
            step:10
        }
        ProductService.findAllProduct(paging,function (err, products) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SaveSuccess });
            } else {
                req.session.customer = {
                    user: req.user,
                    cart: null
                }
                res.json({ success: true, message: mess.SearchSuccess, data: products });
            }

        });
    });
    // Tìm tất cả product có trong catalog có id catalog là  Idpram truyền vào
    router.get('/product/allforcatalog/:idparam', (req, res) => {
        ProductService.findProductByCatalog(req.params.idparam, function (err, products) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SaveSuccess });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: products });
            }

        });
    });

    // Tìm một product bất kỳ co Idpram truyền vào
    router.get('/product/detail/:idparam', (req, res) => {
        ProductService.findProductById(req.params.idparam, function (err, products) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: products });
            }

        });
    });
    // thêm mới một product vào môt branch với Id catalog là Idpram truyền vào
    router.post('/product/add/', (req, res) => {
        ProductService.addProduct(req.body, function (err, dataproducts) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                ProductService.findProductById(dataproducts.idNewProduct, function (err, products) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.AddFail });
                    } else {
                        res.json({ success: true, message: mess.AddSuccess, data: products });
                    }

                });
            }

        });
    });


    //cập nhật một product bất kỳ với id là idparam truyên vào
    router.put('/product/update/', (req, res) => {
        ProductService.updateProduct(req.body, function (err, dataproducts) {
            if (err) {
                res.json({ success: false,message: err ? err : mess.UpdateFail });
            } else {
                ProductService.findProductById(req.body._id, function (err, products) {
                    if (err) {
                        res.json({success: false, message: err ? err : mess.UpdateFail });
                    } else {
                        res.json({ success: true,message: mess.UpdateSuccess, data: products });
                    }

                });
            }

        });
    });
      //cập nhật một product bất kỳ với id là idparam truyên vào
      router.put('/product/comment/', (req, res) => {
        ProductService.commentProduct(req.body, function (err, dataproducts) {
            if (err) {
                res.json({ success: false,message: err ? err : mess.UpdateFail });
            } else {
                ProductService.findProductById(req.body._id, function (err, products) {
                    if (err) {
                        res.json({success: false, message: err ? err : mess.UpdateFail });
                    } else {
                        res.json({ success: true,message: mess.UpdateSuccess, data: products });
                    }

                });
            }

        });
    });
    // xóa một product nằm trong một catalog bất kỳ với id catalog là id param truyền vào
    router.delete('/product/delete/:idparam', (req, res) => {
        ProductService.removeProduct(req.params.idparam, function (err, products) {
            if (err) {
                res.json({ success: false,message: err ? err : mess.RemoveFail });
            } else {
                CatalogService.findCatalogById(products.idOldParent, function (err, catalogs) {
                    if (err) {
                        res.json({ success: false,message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ success: true,message: mess.RemoveSuccess, data: catalogs });
                    }

                });
            }

        });
    });
    //xóa tất cả product nằm trong một menu bất kỳ với id catalog là idparam truyền vào
    router.delete('/product/removeall/:idparam', (req, res) => {
        ProductService.removeAllProduct(req.params.idparam, function (err, data) {
            if (err) {
                res.json({ success: false,message: err ? err : mess.RemoveFail });
            } else {
                CatalogService.findCatalogById(req.params.idparam, function (err, catalogs) {
                    if (err) {
                        res.json({ success: false,message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ success: true,message: mess.RemoveSuccess, data: catalogs });
                    }

                });
            }

        });
    });
    return router;
}