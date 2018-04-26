const PromotionService = require('./controllers/PromotionService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');
const config = require('../Web_Config/database');
var coupon = require('./lib/coupon.code');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả Promotion và nhãn hiệu con nằm trong Promotion ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/promotion/all/', (req, res) => {
        PromotionService.findAllPromotion(function (err, Promotions) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Promotions });
            }

        });
    });
    //Tìm Promotion theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/promotion/detail/:idparam', (req, res) => {
        PromotionService.findPromotionById(req.params.idparam, function (err, Promotions) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Promotions });
            }

        });
    });
    //generate conpo code
    router.post('/generate/code', (req, res) => {
        var result = [];
        for (let index = 0; index < req.body.AmountCounpon; index++) {
                result.push(coupon.generate({
                    parts: 4,
                    partLen: 3,
                }))
        }
        res.json({ success: true, message: mess.GenerateSuccess, data: result });
    });
    //validate conpo code
    router.post('/validate/code', (req, res) => {
        var result = coupon.validate(req.body.coupon, ({
            parts: 4,
            partLen: 3,
        })
        );
        if (result == "") {
            res.json({ success: false, message: mess.ValidateCodeError });
        }
        res.json({ success: true, message: mess.ValidateCodeSuccess, data: result });
    });
      //check conpo code
      router.post('/check/code', (req, res) => {
        PromotionService.checkCouponCode(req.body.coupon,req.body.idPromotion, function (err, Promotions) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.ValidateCodeError });
            } else {
                res.json({ success: true, message: mess.ValidateCodeSuccess, data: Promotions });
            }

        });
    });
    // tạo mới một đối tượng Promotion vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/promotion/add/', (req, res) => {
        PromotionService.addPromotion(req.body, function (err, Promotions) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.AddSuccess, data: Promotions });
            }

        });
    });
    //cập nhật một đối tượng Promotion vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', PromotionController.UpdatePromotion);
    router.put('/promotion/update/', (req, res) => {
        PromotionService.updatePromotion(req.body, function (err, Promotions) {
            if (err) {
                res.json({ success: false, message: err ? err : null });
            } else {
                PromotionService.findPromotionById(req.body._id, function (err, Promotions) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.SearchFail });
                    } else {
                        res.json({ success: true, message: mess.UpdateSuccess, data: Promotions });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Promotion vào database theo id mắc định là  req.params.idparam

    router.delete('/promotion/delete/:idparam', (req, res) => {
        PromotionService.removePromotion(req.params.idparam, function (err, Promotions) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                res.json({ success: true, message: mess.RemoveSuccess, data: Promotions });
            }

        });
    });

    return router;
}