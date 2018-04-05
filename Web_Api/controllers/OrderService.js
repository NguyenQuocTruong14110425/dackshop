const Order = require('../../Models/Order');
const Valid = require('../lib/Valid.js');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class OrderService {
    constructor() { }
    //hàm tìm tất cả Order
    findAllOrder(callback) {
        Order.find()
            .populate({ path: "IdShipping" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một Order theo id tuyền vào
    findOrderById(idparam, callback) {
        Order.findById(idparam)
            .populate({ path: "IdShipping" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một Order
    addOrder(OrderModel, callback) {
        let DataSet = this.getDataOrderForInsert(OrderModel);
        Order.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một Order
    updateOrder(idparam, OrderModel, callback) {
        let dataSet = this.getDataOrderForUpdate(OrderModel, null);
        Order.findByIdAndUpdateAsync(idparam,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa một Order
    removeOrder(idparam, callback) {
        Order.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm lấy dữ liệu khi thêm mới
    getDataOrderForInsert(data) {
        let newOrder = new Order();
        newOrder.FullName = data.FullName,
            newOrder.Address = data.Address,
            newOrder.PhoneNumber = data.PhoneNumber,
            newOrder.PaymentType = data.PaymentType,
            newOrder.Shipping.IdShipping = data.IdShipping,
            newOrder.Shipping.StatusTracking = data.StatusTracking,
            newOrder.DateOrder = new Date()
        return newOrder;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataOrderForUpdate(data) {
        let Order =
            {
                DateUpdate: new Date()
            }
        if (data.FullName) {
            Order.FullName = data.FullName;
        }
        if (data.Address) {
            Order.Address = data.Address;
        }
        if (data.PhoneNumber) {
            Order.PhoneNumber = data.PhoneNumber;
        }
        if (data.PaymentType) {
            Order.PaymentType = data.PaymentType;
        }
        if (data.IdShipping) {
            Order.Shipping.IdShipping = data.IdShipping;
        }
        if (data.StatusTracking) {
            Order.Shipping.StatusTracking = data.StatusTracking;
        }
        if (data.IsDelete) {
            Order.IsDelete = data.IsDelete;
        }
        return Order;
    }

}

module.exports = new OrderService();