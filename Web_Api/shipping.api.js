const ShippingService = require('./controllers/shippingService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
const config = require('../Web_Config/database');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả Shipping và nhãn hiệu con nằm trong Shipping ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/shipping/all/', (req, res) => {
        ShippingService.findAllShipping(function (err, Shippings) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Shippings });
            }

        });
    });
    //Tìm Shipping theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/shipping/detail/:idparam', (req, res) => {
        ShippingService.findShippingById(req.params.idparam, function (err, Shippings) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Shippings });
            }

        });
    });
    // tạo mới một đối tượng Shipping vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/shipping/add/', (req, res) => {
        ShippingService.addShipping(req.body, function (err, Shippings) {
            if (err) {
                res.json({ success: true, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: false, message: mess.AddSuccess, data: Shippings });
            }

        });
    });
    //cập nhật một đối tượng Shipping vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', ShippingController.UpdateShipping);
    router.put('/shipping/update/:idparam', (req, res) => {
        ShippingService.updateShipping(req.params.idparam, req.body, function (err, Shippings) {
            if (err) {
                res.json({ success: false, message: err ? err : null });
            } else {
                ShippingService.findShippingById(req.params.idparam, function (err, Shippings) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.SearchFail });
                    } else {
                        res.json({ success: false, message: mess.UpdateSuccess, data: Shippings });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Shipping vào database theo id mắc định là  req.params.idparam

    router.delete('/shipping/delete/:idparam', (req, res) => {
        ShippingService.removeShipping(req.params.idparam, function (err, Shippings) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                res.json({ success: true, message: mess.RemoveSuccess, data: Shippings });
            }

        });
    });

    return router;
}