const PromotionService = require('./controllers/PromotionService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
const config = require('../Web_Config/database');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả Promotion và nhãn hiệu con nằm trong Promotion ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/promotion/all/', (req, res) => {
        PromotionService.findAllPromotion(function (err, Promotions) {
            if (err) {
                res.json({ message: err?err:mess.SearchFail });
            } else {
                res.json({ message: mess.SearchSuccess, data: Promotions });
            }

        });
    });
    //Tìm Promotion theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/promotion/detail/:idparam', (req, res) => {
        PromotionService.findPromotionById(req.params.idparam, function (err, Promotions) {
            if (err) {
                res.json({ message: err?err:mess.SearchFail });
            } else {
                res.json({ message: mess.SearchSuccess, data: Promotions });
            }

        });
    });
    // tạo mới một đối tượng Promotion vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/promotion/add/', (req, res) => {
        PromotionService.addPromotion(req.body, function (err, Promotions) {
            if (err) {
                res.json({ message: err?err:mess.AddFail});
            } else {
                res.json({ message: mess.AddSuccess, data: Promotions });
            }

        });
    });
    //cập nhật một đối tượng Promotion vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', PromotionController.UpdatePromotion);
    router.put('/promotion/update/:idparam', (req, res) => {
        PromotionService.updatePromotion(req.params.idparam, req.body, function (err, Promotions) {
            if (err) {
                res.json({ message: err?err:null});
            } else {
                PromotionService.findPromotionById(req.params.idparam, function (err, Promotions) {
                    if (err) {
                        res.json({message: err?err:mess.SearchFail});
                    } else {
                        res.json({ message: mess.UpdateSuccess, data: Promotions });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Promotion vào database theo id mắc định là  req.params.idparam

    router.delete('/promotion/delete/:idparam', (req, res) => {
        PromotionService.removePromotion(req.params.idparam, function (err, Promotions) {
            if (err) {
                res.json({message: err?err:mess.RemoveFail });
            } else {
                res.json({ message: mess.RemoveSuccess, data: Promotions });
            }

        });
    });

    return router;
}