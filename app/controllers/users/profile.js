var Order = require('../../models/order');
module.exports = {
    GetUserProfile: (req , res) => {
        Order.find({ user: req.user }).then(orders => {
            var cart;
            orders.forEach((order) => {
                cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
            res.render('pages/users/profile', {
                orders: orders
            });
        }).catch(err => {
            return res.write(err.message);
        });
    }
}