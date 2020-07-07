var functions = require('../middlewares/functions');
module.exports = function Cart(oldcart){
    this.items = oldcart.items || {};
    this.totalquantity = oldcart.totalquantity || 0;
    this.totalprice = oldcart.totalprice || 0;
    this.add = (item, id) => {
        var storeditem = this.items[id];
        if(!storeditem){
            storeditem = this.items[id] = {
                item: item,
                price: 0,
                discount: 0,
                quantity: 0
            };
        }
        storeditem.quantity++;
        storeditem.price = functions.
                              netprice(storeditem.item.price, storeditem.item.discount)
                                * storeditem.quantity;
        this.totalquantity++;
        this.totalprice += functions.
                               netprice(storeditem.item.price, storeditem.item.discount);
        storeditem.item.quantity--;
    };
    this.generateArray = () => {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
    this.reduceByOne = (id) => {
        this.items[id].quantity--;
        this.items[id].item.quantity++;
        this.items[id].price -= functions.
                                   netprice(this.items[id].item.price, this.items[id].discount);
        this.totalquantity--;
        this.totalprice -= functions.
                               netprice(this.items[id].item.price, this.items[id].item.discount);
        if(this.items[id].quantity <= 0) {
            delete this.items[id];
        }
    };
    this.remove = (id) => {
        this.totalquantity -= this.items[id].quantity;
        this.items[id].item.quantity += this.items[id].quantity;
        this.totalprice -= this.items[id].price;
        delete this.items[id];
    };
}