var Product   = require('../../../models/product'),
    functions = require('../../../middlewares/functions');
module.exports = {
    GetHomePage: (req , res) => {
        var messages   = req.flash('error'),
            noMatch    = null,
            successMgs = req.flash('success')[0],
            array      = [];
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
                if(req.query.search){
                    try {
                        var input  = new RegExp(
                               functions.escaperegex(req.query.search), 'gi'
                            );
                        Product.find({
                            $or: [
                                { productType: input },
                                { brand: input }, 
                                { model: input }
                            ]
                        }).then(products => {
                            if(!products){
                                noMatch = 
                                 "No products match that query, please try again.";
                            }
                            res.render('pages/home', {
                                products: products,
                                brands: functions.removeDups(array),
                                noMatch: noMatch,
                                successMgs: 'Search has been done successfully',
                                noMessages: null,
                                messages: null
                            });
                        }).catch(err => {
                            return next(err);
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }else{
                    res.render('pages/home' , {
                        products: {},
                        brands: functions.removeDups(array),
                        noMatch: noMatch,
                        successMgs: successMgs,
                        noMessages: !successMgs,
                        messages: messages
                    });
                }
            }
        });
    }
}