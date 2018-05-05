const Product = require('../../Models/product');
const async = require('async')
class ProductDomain {
    constructor() {
    }

    Getinit(callback) {
        async.waterfall([
            function (callback) {
                Product.count({
                    IsDelete: false,
                })
                    .execAsync()
                    .then(function (dataCount) {
                        var DataProduct = {
                            TotalProduct: 0,
                            TotalPublic: 0,
                            TotalSoldOut: 0,
                            TotalInMonth: {}
                        }
                        DataProduct.TotalProduct = dataCount;
                        return callback(null, DataProduct);
                    })
            },
            function (data, callback) {
                Product.count({
                    IsActive: true,
                })
                    .execAsync()
                    .then(function (dataCount) {
                        data.TotalPublic = dataCount;
                        return callback(null, data);
                    })
            },
            function (data, callback) {
                Product.count({
                    AmountProduct: 0,
                })
                    .execAsync()
                    .then(function (dataCount) {
                        data.TotalSoldOut = dataCount;
                        return callback(null, data);
                    })
            }
            ,
            function (data, callback) {
                Product.aggregate(
                    {
                        $match: { IsDelete: false }
                    },
                    {
                        $group: {
                            _id: { year: { $year: "$DateCreate" }, month: { $month: "$DateCreate" }, },
                            totalAmount: { $sum: 1 },
                        },
                    },
                    {
                        $group: {
                            _id: { year: "$_id.year" },
                            ProductNew: {
                                $push:
                                    {
                                        month: "$_id.month",
                                        totalAmount: "$totalAmount",
                                    }
                            }
                        }
                    }
                )
                    .execAsync()
                    .then(function (dataCount) {
                        data.TotalInMonth = dataCount;
                        return callback(null, data);
                    })
            }
        ], function (err, results) {
            if (err) return callback(err.message);
            return callback(null, results)
        })
    }
    SetCountTotalProduct(callback) {
        Product.count({
            IsDelete: false,
        })
            .execAsync()
            .then(function (dataCount) {
                return callback(null, dataCount);
            })
            .catch(err => {
                return callback(err.message);
            })
    }

}

module.exports = ProductDomain;