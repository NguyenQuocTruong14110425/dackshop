const OrderService = require('./controllers/orderService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
const config = require('../Web_Config/database');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả Order và nhãn hiệu con nằm trong Order ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/order/all/', (req, res) => {
        OrderService.findAllOrder(function (err, Orders) {
            if (err) {
                res.json({ message: err?err:mess.SearchFail });
            } else {
                res.json({ message: mess.SearchSuccess, data: Orders });
            }
        });
    });
    //Tìm Order theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/order/detail/:idparam', (req, res) => {
        OrderService.findOrderById(req.params.idparam, function (err, Orders) {
            if (err) {
                res.json({ message: err?err:mess.SearchFail });
            } else {
                res.json({ message: mess.SearchSuccess, data: Orders });
            }

        });
    });
    // tạo mới một đối tượng Order vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/order/add/', (req, res) => {
        OrderService.addOrder(req.body, function (err, Orders) {
            if (err) {
                res.json({ message: err?err:mess.AddFail});
            } else {
                res.json({ message: mess.AddSuccess, data: Orders });
            }

        });
    });
    //cập nhật một đối tượng Order vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', OrderController.UpdateOrder);
    router.put('/order/update/:idparam', (req, res) => {
        OrderService.updateOrder(req.params.idparam, req.body, function (err, Orders) {
            if (err) {
                res.json({ message: err?err:null});
            } else {
                OrderService.findOrderById(req.params.idparam, function (err, Orders) {
                    if (err) {
                        res.json({message: err?err:mess.SearchFail});
                    } else {
                        res.json({ message: mess.UpdateSuccess, data: Orders });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Order vào database theo id mắc định là  req.params.idparam

    router.delete('/order/delete/:idparam', (req, res) => {
        OrderService.removeOrder(req.params.idparam, function (err, Orders) {
            if (err) {
                res.json({message: err?err:mess.RemoveFail });
            } else {
                res.json({ message: mess.RemoveSuccess, data: Orders });
            }

        });
    });

    return router;
}