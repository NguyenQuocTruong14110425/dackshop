class CartService {
    constructor(oldCart) {
        this.items = oldCart.items || {};
        this.totalQtyOrder = oldCart.totalQtyOrder || 0;
        this.totalOrder = oldCart.totalOrder || 0;
    }

    AddProductToCart(item, id) {
        var storedItem = {
            item: item,
            totalQty: 0,
            totalPrice: 0
        };
        var totalTemp;
        if (this.items[id] != undefined || this.items[id] != null) {
            if (this.items[id].item.Product._id == item.Product._id) {
                if (this.items[id].item.Product.Price != item.Product.Price) {
                    totalTemp = this.items[id].totalPrice;
                }
                storedItem = this.items[id] = {
                    item: item,
                    totalQty: this.items[id].totalQty ? this.items[id].totalQty : 0,
                    totalPrice: this.items[id].totalPrice ? this.items[id].totalPrice : 0
                };
            }
            else {
                storedItem = this.items[id] = {
                    item: item,
                    totalQty: 0,
                    totalPrice: 0
                };
            }
        }
        else {
            this.items[id] = storedItem
        }
        storedItem.totalQty = Number(storedItem.totalQty) + Number(item.Product.Qty);
        storedItem.totalPrice = storedItem.item.Product.Price * storedItem.totalQty;
        this.totalQtyOrder = Number(this.totalQtyOrder) + Number(item.Product.Qty);
        if (totalTemp) {
            this.totalOrder = this.totalOrder + (storedItem.item.Product.Price * storedItem.totalQty) - totalTemp
        }
        else {
            this.totalOrder = this.totalOrder + (storedItem.item.Product.Price * item.Product.Qty)
        }
    };

    reduceByOne(id) {
        this.items[id].totalQty--;
        this.items[id].totalPrice -= this.items[id].item.Product.Price;
        this.totalQtyOrder--;
        this.totalOrder -= this.items[id].item.Product.Price;

        if (this.items[id].totalQty <= 0) {
            delete this.items[id];
        }
    };

    increaseByOne(id, qty) {
        this.items[id].totalQty++;
        this.items[id].totalPrice += this.items[id].item.Product.Price;
        this.totalQtyOrder++;
        this.totalOrder += this.items[id].item.Product.Price;
    };
    removeItem(id) {
        this.totalQtyOrder -= this.items[id].totalQty;
        this.totalOrder -= this.items[id].totalPrice;
        delete this.items[id];
    };
    getTocart(items) {
        var arr = [];
        for (var id in items) {
            arr.push(items[id]);
        }
        return arr;
    };
    generateArray() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}

module.exports = CartService;