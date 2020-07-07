var Product = require('../../../models/product');
const functions = require('../../../middlewares/functions');
module.exports = {
    GetShowProductPage: (req , res) => {
        var array = [];
        Product.find((error, items) => {
            if(error){
                req.flash(
                    'error_msg',
                    'There is something wrong in loading the page'
                );
                res.redirect('/');
            }else{
                items.forEach((item) => {
                    array.push(item.brand);
                });
                Product.findById(req.params.id).then(showProduct => {
                    var messages = req.flash('error');
                    res.render('pages/products/access/show' , {
                        product: showProduct,
                        brands: functions.removeDups(array),
                        messages: messages
                    })
                }).catch(err => {
                    res.redirect('back');
                });
            }
        });
    }
}