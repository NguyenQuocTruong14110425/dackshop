const Size = require('../Models/Size');
const SizeService = require('./controllers/SizeService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
const config = require('../Web_Config/database');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả Size và nhãn hiệu con nằm trong Size ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/size/all/', (req, res) => {
        SizeService.findAllSize(function (err, Sizes) {
            if (err) {
                res.json({ message: err?err:mess.SearchFail });
            } else {
                res.json({ message: mess.SearchSuccess, data: Sizes });
            }

        });
    });
    //Tìm Size theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/size/detail/:idparam', (req, res) => {
        SizeService.findSizeById(req.params.idparam, function (err, Sizes) {
            if (err) {
                res.json({ message: err?err:mess.SearchFail });
            } else {
                res.json({ message: mess.SearchSuccess, data: Sizes });
            }

        });
    });
    // tạo mới một đối tượng Size vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/size/add/', (req, res) => {
        SizeService.addSize(req.body, function (err, Sizes) {
            if (err) {
                res.json({ message: err?err:mess.AddFail});
            } else {
                res.json({ message: mess.AddSuccess, data: Sizes });
            }

        });
    });
    //cập nhật một đối tượng Size vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', SizeController.UpdateSize);
    router.put('/size/update/:idparam', (req, res) => {
        SizeService.updateSize(req.params.idparam, req.body, function (err, Sizes) {
            if (err) {
                res.json({ message: err?err:null});
            } else {
                SizeService.findSizeById(req.params.idparam, function (err, Sizes) {
                    if (err) {
                        res.json({message: err?err:mess.SearchFail});
                    } else {
                        res.json({ message: mess.UpdateSuccess, data: Sizes });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Size vào database theo id mắc định là  req.params.idparam

    router.delete('/size/delete/:idparam', (req, res) => {
        SizeService.removeSize(req.params.idparam, function (err, Sizes) {
            if (err) {
                res.json({message: err?err:mess.RemoveFail });
            } else {
                res.json({ message: mess.RemoveSuccess, data: Sizes });
            }

        });
    });

    return router;
}