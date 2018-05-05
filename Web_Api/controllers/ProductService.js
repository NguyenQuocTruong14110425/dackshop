const Catalog = require('../../Models/catalog');
const Product = require('../../Models/product');
const Valid = require('../lib/Valid.js');
const EnumConstant = require('../../Web_Config/EnumConstant.js');
var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class ProductService {
    constructor() { }
    // hàm tìm danh sách Product
    findAllProduct(paging,callback) {
        const limit = (Number(paging.page)*Number(paging.step))
        Product.find()
            .populate({ path: "CatalogParent", select: "_id CatalogName QtyProduct" })
            .populate({ path: "Color.IdColor" })
            .populate({ path: "Size.IdSize" })
            .populate({ path: "Image.LeftImage" })
            .populate({ path: "Image.LeftImageZoom" })
            .populate({ path: "Image.RightImage" })
            .populate({ path: "Image.RightImageZoom" })
            .populate({ path: "Image.UnderImage" })
            .populate({ path: "Image.UnderImageZoom" })
            .populate({ path: "Promotion", select: "_id TypePromotion PromotionName Value SaleEndDate SaleStartDate ApplyFor" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm tìm danh sách Product theo id Catalog
    findProductByCatalog(idparam, callback) {
        Catalog.findById(idparam)
            .populate({ path: "CatalogParent", select: "_id CatalogName QtyProduct" })
            .populate({ path: "Color.IdColor" })
            .populate({ path: "Size.IdSize" })
            .populate({ path: "Image.LeftImage" })
            .populate({ path: "Image.LeftImageZoom" })
            .populate({ path: "Image.RightImage" })
            .populate({ path: "Image.RightImageZoom" })
            .populate({ path: "Image.UnderImage" })
            .populate({ path: "Image.UnderImageZoom" })
            .populate({ path: "Promotion", select: "_id TypePromotion PromotionName Value SaleEndDate SaleStartDate ApplyFor" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data.ProductChild);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm tìm Product theo id Product truyền vào
    findProductById(idparam, callback) {
        Product.findById(idparam)
            .populate({ path: "CatalogParent", select: "_id CatalogName QtyProduct" })
            .populate({ path: "Color.IdColor" })
            .populate({ path: "Size.IdSize" })
            .populate({ path: "Image.LeftImage" })
            .populate({ path: "Image.LeftImageZoom" })
            .populate({ path: "Image.RightImage" })
            .populate({ path: "Image.RightImageZoom" })
            .populate({ path: "Image.UnderImage" })
            .populate({ path: "Image.UnderImageZoom" })
            .populate({ path: "Promotion", select: "_id TypePromotion PromotionName Value SaleEndDate SaleStartDate ApplyFor" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    }
    //hàm them mới một Product
    addProduct(ProductModel, callback) {
        let DataSet = this.getDataProductForInsert(ProductModel, ProductModel.CatalogParent);
        Product.createAsync(DataSet)
            .then(function (Products) {
                var idProduct = Products._id;
                Catalog.findByIdAndUpdate(ProductModel.CatalogParent,
                    { "$push": { "ProductChild": idProduct } },
                    { "new": true, "upsert": true })
                    .then(DataCatalog => Catalog.findByIdAndUpdate(DataCatalog._id, { DateUpdate: new Date(), QtyProduct: Number(DataCatalog.ProductChild.length) }))
                    .then(function (data) {
                        data = {
                            idNewProduct: idProduct
                        }
                        if (data == null || data == undefined) return callback(mess.AddFail);
                        return callback(null, data);
                    })
                    .catch(err => {
                        return callback(err.message);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xử lý cập nhật một Product
    updateProduct(idparam, ProductModel, callback) {
        let dataSet = this.getDataProductForUpdate(ProductModel, null);
        Product.findByIdAndUpdateAsync(idparam,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa tất cả Products có trong Catalog
    removeAllProduct(idparam, callback) {
        Catalog.findByIdAsync(idparam)
            .then(function (Catalogs) {
                let countProduct = Number(Catalogs.ProductChild.length)
                for (let index in Catalogs.ProductChild) {
                    if (index < countProduct) {
                        Product.findByIdAndRemove(Catalogs.ProductChild[index])
                            .catch(err => {
                                return callback(err.message);
                            })
                    }
                }
                Catalog.findByIdAndUpdate(idparam, { DateUpdate: new Date(), ProductChild: [], QtyProduct: 0 })
                    .then(function (data) {
                        if (data == null || data == undefined) return callback(mess.RemoveFail);
                        return callback(null, data);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xó một product bất kỳ
    removeProduct(idparam, callback) {
        Product.findByIdAndRemove(idparam)
            .then(function (Products) {
                var CatalogParent = Products.CatalogParent;
                Catalog.findByIdAndUpdate(CatalogParent,
                    { $pull: { ProductChild: Products._id } },
                    { "new": true, "upsert": true })
                    .then(DataCatalog => Catalog.findByIdAndUpdate(DataCatalog._id, { DateUpdate: new Date(), QtyProduct: Number(DataCatalog.ProductChild.length) }))
                    .then(function (data) {
                        data = {
                            idOldParent: CatalogParent
                        }
                        if (data == null || data == undefined) return callback(mess.RemoveFail);
                        return callback(null, data);
                    })
                    .catch(err => {
                        return callback(err.message);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };

    // hàm lấy data để thêm mới
    getDataProductForInsert(data, IdCatalog) {
        let newProduct = new Product();
        newProduct.ProductName = data.ProductName,
            newProduct.ShortDescription = data.ShortDescription,
            newProduct.LongDescription = data.LongDescription,
            newProduct.AmountProduct = data.AmountProduct,
            newProduct.Price = data.Price,
            newProduct.SalePrice = data.SalePrice,
            newProduct.Image = data.Image,
            newProduct.DateCreate = new Date(),
            newProduct.DateUpdate = null,
            newProduct.Comment = [],
            newProduct.Promotion = Valid.getObjectIDIfValid(data.Promotion),
            newProduct.Suggestions = data.Suggestions
        newProduct.Color = data.Color
        newProduct.Size = data.Size
        newProduct.CheckNew = data.CheckNew
        newProduct.Onsale = data.Onsale
        if (IdCatalog != null) {
            newProduct.CatalogParent = IdCatalog
        }
        return newProduct;
    }
    // hàm lấy data để cập nhật
    getDataProductForUpdate(data) {
        let Product =
            {
                DateUpdate: new Date()
            }
        if (data.ProductName) {
            Product.ProductName = data.ProductName;
        }
        if (data.ShortDescription) {
            Product.ShortDescription = data.ShortDescription
        }
        if (data.LongDescription) {
            Product.LongDescription = data.LongDescription
        }
        if (data.AmountProduct) {
            Product.AmountProduct = data.AmountProduct
        }
        if (data.Price) {
            Product.Price = data.Price
        }
        if (data.SalePrice) {
            Product.SalePrice = data.SalePrice
        }
        if (data.Size) {
            Product.Size = data.Size
        }
        if (data.Color) {
            Product.Color = data.Color
        }
        if (data.Image) {
            Product.Image = data.Image
        }
        if (data.IsDelete !== undefined) {
            Product.IsDelete = data.IsDelete;
        }
        if (data.CheckNew !== undefined) {
            Product.CheckNew = data.CheckNew;
        }
        if (data.Onsale !== undefined) {
            Product.Onsale = data.Onsale;
        }
        if (data.IsActive !== undefined) {
            Product.IsActive = data.IsActive;
        }
        return Product;
    }
    //
    //*************************/
    //Thống kê
    //*************************/
    CountProduct(Condition, callback) {
        Product.count({
            IsActive: Condition.IsActive || true,
            IsDelete: Condition.IsDelete || false,
            Onsale: Condition.Onsale || true,
            CheckNew: Condition.CheckNew || true,
            AmountProduct: { $gte: Condition.MinAmount || 0, $lte: Condition.MaxAmount || 10000000 },
            Price: { $gte: Condition.MinPrice || 0, $lte: Condition.MaxPrice || 10000000 * 10000000 },
            SalePrice: { $gte: Condition.MinSalePrice || 0, $lte: Condition.MaxSalePrice || 10000000 * 10000000 },
        })
            .execAsync()
            .then(function (dataCount) {
                return callback(null, dataCount);
            })
            .catch(err => {
                return callback(err.message);
            })
    }
    CountProductInMonth(callback) {
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
                return callback(null, dataCount);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    CountObject() {
        Product.aggregate(
            {
                $match: { IsDelete: false }
            },
            {
                $count: "IsActive"
            }
        )
    };

}

module.exports = new ProductService();