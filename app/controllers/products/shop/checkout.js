var Cart  = require('../../../models/cart'),
    Order = require('../../../models/order');
module.exports = {
    GetCheckoutPage: (req , res) => {
        if(!req.session.cart){
            return res.redirect('/product/cart');
        }else{
            var cart   = new Cart(req.session.cart),
                errMsg = req.flash('error')[0];
            return res.render('pages/products/shop/checkout' , {
                total: cart.totalprice,
                errMsg: errMsg,
                noError: !errMsg
            });
        }
    },
    PostCheckoutPage: (req , res) => {
        if(!req.session.cart) {
            return res.redirect('/product/cart');
        }
        var cart   = new Cart(req.session.cart),
            stripe = require("stripe")("sk_test_7zAQzvH1DpI4Iv0h2YWbBnOo00uR5uRKvm");
        stripe.charges.create({
            amount: cart.totalPrice * 100,
            currency: "eur",
            source: req.body.stripeToken,
            description: "Test Charge"
        }, (error, charge) => {
            var order = new Order({
                user: req.user,
                cart: cart,
                address: req.body.address,
                phone: req.body.phone,
                name: req.body.name,
                paymentId: charge.id
            });
            if(error){
                req.flash('error', err.message);
                return res.redirect('back');
            }
            order.save((err, result) => {
                if(err){
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
                req.flash('success', 'Congradulations you paid for your products!');
                req.session.cart = null;
                res.redirect('/');
            });
        });
    }
}