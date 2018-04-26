const ColorService = require('./controllers/ColorService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
const config = require('../Web_Config/database');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả Color và nhãn hiệu con nằm trong Color ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/color/all/', (req, res) => {
        ColorService.findAllColor(function (err, Colors) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Colors });
            }

        });
    });
    //Tìm Color theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/color/detail/:idparam', (req, res) => {
        ColorService.findColorById(req.params.idparam, function (err, Colors) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Colors });
            }

        });
    });
    // tạo mới một đối tượng Color vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/color/add/', (req, res) => {
        ColorService.addColor(req.body, function (err, Colors) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.AddSuccess, data: Colors });
            }

        });
    });
    //cập nhật một đối tượng Color vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', ColorController.UpdateColor);
    router.put('/color/update/', (req, res) => {
        ColorService.updateColor(req.body, function (err, Colors) {
            if (err) {
                res.json({ message: err ? err : null });
            } else {
                ColorService.findColorById(req.body._id, function (err, Colors) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.SearchFail });
                    } else {
                        res.json({ success: true, message: mess.UpdateSuccess, data: Colors });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Color vào database theo id mắc định là  req.params.idparam

    router.delete('/color/delete/:idparam', (req, res) => {
        ColorService.removeColor(req.params.idparam, function (err, Colors) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                res.json({ success: true, message: mess.RemoveSuccess, data: Colors });
            }

        });
    });

    return router;
}