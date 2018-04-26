const config = require('../Web_Config/database');
const MenuService = require('./controllers/MenuService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');

module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả menu và nhãn hiệu con nằm trong menu ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/menu/all/', (req, res) => {
        MenuService.findAllMenu(function (err, Menus) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Menus });
            }

        });
    });
    //Tìm menu theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/menu/detail/:idparam', (req, res) => {
        MenuService.findMenuById(req.params.idparam, function (err, Menus) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Menus });
            }

        });
    });
    // tạo mới một đối tượng menu vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/menu/add/', (req, res) => {
        MenuService.addMenu(req.body, function (err, Menus) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.AddSuccess, data: Menus });
            }

        });
    });
    //cập nhật một đối tượng menu vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', MenuController.UpdateMenu);
    router.put('/menu/update/', (req, res) => {
        MenuService.updateMenu(req.body, function (err, Menus) {
            if (err) {
                res.json({ success: false, message: err ? err : null });
            } else {
                MenuService.findMenuById(req.body._id, function (err, Menus) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.SearchFail });
                    } else {
                        res.json({ success: true, message: mess.UpdateSuccess, data: Menus });
                    }

                });
            }

        });
    });
    //xóa một đối tượng menu vào database theo id mắc định là  req.params.idparam

    router.delete('/menu/delete/:idparam', (req, res) => {
        MenuService.removeMenu(req.params.idparam, function (err, Menus) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                res.json({ success: true, message: mess.RemoveSuccess, data: Menus });
            }

        });
    });

    return router;
}