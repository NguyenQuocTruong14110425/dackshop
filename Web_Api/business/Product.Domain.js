const Product = require('../../Models/product');
const Order = require('../../Models/Order');
const async = require('async')
class ProductDomain {
    constructor() {
    }

    AnalyzeProduct(callback) {
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
    /// analyze sale
    AnalyzeSale(callback) {
        async.waterfall([
            function (callback) {
                Order.aggregate(
                    {
                        $match: { IsDelete: false }
                    },
                    {
                        $group: {
                            _id: { year: { $year: "$DateOrder" } },
                            totalSale: { $sum: "$Cart.totalOrder" },
                            totalQuantity: { $sum: "$Cart.totalQtyOrder" },
                        }
                    },
                    { $sort: { "_id.year": 1 } }

                )
                    .execAsync()
                    .then(function (dataCount) {
                        var DataAnalyze = {
                            SaleOfYear: 0,
                            SalesOfMonth: 0,
                            SalesOfWeek: 0,
                            SalesOfDay: 0
                        }
                        DataAnalyze.SaleOfYear = dataCount;
                        return callback(null, DataAnalyze);
                    })
            },
            function (data, callback) {
                Order.aggregate(
                    {
                        $match: { IsDelete: false }
                    },
                    {
                        $group: {
                            _id: { year: { $year: "$DateOrder" }, month: { $month: "$DateOrder" } },
                            totalSale: { $sum: "$Cart.totalOrder" },
                            totalQuantity: { $sum: "$Cart.totalQtyOrder" },
                        }
                    },
                    { $sort: { "_id.month": 1 } },
                    {
                        $group: {
                            _id: { year: "$_id.year" },
                            SalesOfMonth: {
                                $push:
                                    {
                                        month: "$_id.month",
                                        totalSale: "$totalSale",
                                        totalQuantity: "$totalQuantity",
                                    }
                            },
                        },
                    },
                    { $sort: { "_id.year": 1 } }

                )
                    .execAsync()
                    .then(function (dataCount) {
                        data.SalesOfMonth = dataCount;
                        return callback(null, data);
                    })
            },
            function (data, callback) {
                Order.aggregate(
                    {
                        $match: { IsDelete: false }
                    },
                    {
                        $group: {
                            _id: {
                                year: { $year: "$DateOrder" },
                                month: { $month: "$DateOrder" },
                                week: { $week: "$DateOrder" },
                            },
                            totalSale: { $sum: "$Cart.totalOrder" },
                            totalQuantity: { $sum: "$Cart.totalQtyOrder" },
                        }
                    },
                    { $sort: { "_id.week": 1 } },
                    {
                        $group: {
                            _id: { year: "$_id.year", month: "$_id.month" },
                            SalesOfWeek: {
                                $push:
                                    {
                                        week: "$_id.week",
                                        totalSale: "$totalSale",
                                        totalQuantity: "$totalQuantity",
                                    }
                            }
                        },
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } }


                )
                    .execAsync()
                    .then(function (dataCount) {
                        data.SalesOfWeek = dataCount;
                        return callback(null, data);
                    })
            },
            function (data, callback) {
                Order.aggregate(
                    {
                        $match: { IsDelete: false }
                    },
                    {
                        $group: {
                            _id: { year: { $year: "$DateOrder" }, month: { $month: "$DateOrder" }, day: { $dayOfMonth: "$DateOrder" } },
                            totalSale: { $sum: "$Cart.totalOrder" },
                            totalQuantity: { $sum: "$Cart.totalQtyOrder" },
                        }
                    },
                    { $sort: { "_id.day": 1 } },
                    {
                        $group: {
                            _id: { year: "$_id.year", month: "$_id.month" },
                            SalesOfDay: {
                                $push:
                                    {
                                        day: "$_id.day",
                                        totalSale: "$totalSale",
                                        totalQuantity: "$totalQuantity",
                                    }
                            }
                        },
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } }
                )
                    .execAsync()
                    .then(function (dataCount) {
                        data.SalesOfDay = dataCount;
                        return callback(null, data);
                    })
            }
        ], function (err, results) {
            if (err) return callback(err.message);
            return callback(null, results)
        })
    }

}
module.exports = ProductDomain;