const OrderService = require('./controllers/orderService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
const config = require('../Web_Config/database');
const ProductDomain = require('./business/Product.Domain');

module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    router.get('/order/analyzesale', (req, res) => {
        var ProductConfig = new ProductDomain();
        var Dataconfig =  ProductConfig.AnalyzeSale(function (err, result) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, data: result });
            }
        })
    });
    //Tìm tất cả Order và nhãn hiệu con nằm trong Order ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/order/all/', (req, res) => {
        OrderService.findAllOrder(function (err, Orders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Orders });
            }
        });
    });
    //Tìm Order theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/order/detail/:idparam', (req, res) => {
        OrderService.findOrderById(req.params.idparam, function (err, Orders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Orders });
            }

        });
    });
     //Tìm Order theo mã đơn hàng
     router.get('/order/trackingcode/:codeparam', (req, res) => {
        OrderService.findOrderByCode(req.params.codeparam, function (err, Orders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Orders });
            }

        });
    });
    // tạo mới một đối tượng Order vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/order/add/', (req, res) => {
        OrderService.addOrder(req.body, function (err, Orders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.AddSuccess, data: Orders });
            }

        });
    });
    //cập nhật một đối tượng Order vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', OrderController.UpdateOrder);
    router.put('/order/update/', (req, res) => {
        OrderService.updateOrder(req.body, function (err, Orders) {
            if (err) {
                res.json({ success: false, message: err ? err : null });
            } else {
                OrderService.findOrderById(req.body._id, function (err, Orders) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.SearchFail });
                    } else {
                        res.json({ success: true, message: mess.UpdateSuccess, data: Orders });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Order vào database theo id mắc định là  req.params.idparam

    router.delete('/order/delete/:idparam', (req, res) => {
        OrderService.removeOrder(req.params.idparam, function (err, Orders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                res.json({ success: true, message: mess.RemoveSuccess, data: Orders });
            }

        });
    });

    return router;
}