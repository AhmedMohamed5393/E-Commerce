var Product = require('../../../models/product'),
    Cart    = require('../../../models/cart');
module.exports = {
    GetAddToCardPage: (req , res) => {
        var productID = req.params.id,
            cart      = new Cart(req.session.cart? req.session.cart : {});
        Product.findById(productID , (err , chosenproduct) => {
            if(err){
                req.flash('err_msg' , 'Sorry! There is an error during adding the product');
                res.redirect('back');
            }else{
                cart.add(chosenproduct, chosenproduct.id);
                req.session.cart = cart;
                res.redirect('back');
            }
        });
    },
    GetCardPage: (req , res) => {
        if(!req.session.cart){
            return res.render('pages/products/shop/cart' , {
                products: null
            });
        }else{
            var cart = new Cart(req.session.cart);
            return res.render('pages/products/shop/cart' , {
                products: cart.generateArray(),
                totalprice: cart.totalprice
            });
        }
    },
    RemoveItemCard: (req , res , next) => {
        var productID = req.params.id,
            cart      = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(productID);
        req.session.cart = cart;
        res.redirect('/product/cart');
    },
    DeleteCardProduct: (req, res, next) => {
        var productID = req.params.id,
            cart      = new Cart(req.session.cart ? req.session.cart : {});
        cart.remove(productID);
        req.session.cart = cart;
        res.redirect('/product/cart');
    }
}