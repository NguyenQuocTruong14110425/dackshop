const Promotion = require('../../Models/Promotion');
const Valid = require('../lib/Valid.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class PromotionService {
    constructor() { }
    //hàm tìm tất cả Promotion
    findAllPromotion(callback) {
        Promotion.find()
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một Promotion theo id tuyền vào
    findPromotionById(idparam, callback) {
        Promotion.findById(idparam)
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một Promotion
    addPromotion(PromotionModel, callback) {
        let DataSet = this.getDataPromotionForInsert(PromotionModel);
        Promotion.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một Promotion
    updatePromotion(PromotionModel, callback) {
        let dataSet = this.getDataPromotionForUpdate(PromotionModel, null);
        Promotion.findByIdAndUpdateAsync(PromotionModel._id,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa một Promotion
    removePromotion(idparam, callback) {
        Promotion.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một Promotion
    checkCouponCode(coupon, PromotionModel, callback) {
        Promotion.findById(PromotionModel._id)
        .execAsync()
        .then(function (data) {
            if (data == null || data == undefined) return callback(mess.SearchFail);
            else
            {
                data.Coupon.forEach(element => {
                    if(element==coupon) return callback(null, data);
                    return callback(err.message);
                });
            }
            return callback(null, data);
        })
        .catch(err => {
            return callback(err.message);
        })
};
    //hàm lấy dữ liệu khi thêm mới
    getDataPromotionForInsert(data) {
        let newPromotion = new Promotion();
        newPromotion.PromotionName = data.PromotionName,
            newPromotion.Description = data.Description,
            newPromotion.Value = data.Value,
            newPromotion.Coupon = data.Coupon,
            newPromotion.AmountCounpon = data.AmountCounpon,
            newPromotion.SaleStartDate = data.SaleStartDate,
            newPromotion.SaleEndDate = data.SaleEndDate,
            newPromotion.ApplyFor = data.ApplyFor,
            newPromotion.TypePromotion = data.TypePromotion,
            newPromotion.DateCreate = new Date()
        return newPromotion;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataPromotionForUpdate(data) {
        let Promotion =
            {
                DateUpdate: new Date()
            }
        if (data.PromotionName) {
            Promotion.PromotionName = data.PromotionName;
        }
        if (data.Description) {
            Promotion.Description = data.Description;
        }
        if (data.Value) {
            Promotion.Value = data.Value;
        }
        if (data.Counpon) {
            Promotion.Counpon = data.Counpon;
        }
        if (data.AmountCounpon) {
            Promotion.AmountCounpon = AmountCounpon.Value;
        }
        if (data.SaleEndDate) {
            Promotion.SaleEndDate = data.SaleEndDate;
        }
        if (data.SaleStartDate) {
            Promotion.SaleStartDate = data.SaleStartDate;
        }
        if (data.TypePromotion) {
            Promotion.TypePromotion = data.TypePromotion;
        }
        if (data.ApplyFor) {
            Promotion.ApplyFor = data.ApplyFor;
        }
        if (data.IsActive!==undefined) {
            Promotion.IsActive = data.IsActive;
        }
        if (data.IsDelete!==undefined) {
            Promotion.IsDelete = data.IsDelete;
        }
        return Promotion;
    }

}

module.exports = new PromotionService();