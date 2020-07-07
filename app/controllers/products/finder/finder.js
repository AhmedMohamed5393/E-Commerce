var Product   = require('../../../models/product');
const functions = require('../../../middlewares/functions');
module.exports = {
    GetTypeProducts: (req, res) => {
        var messages   = req.flash('error'),
            successMgs = req.flash('success')[0],
            type       = req.params.type,
            Type       = null,
            array      = [],
            resPerPage = 25,
            page       = req.params.page || 1;
        if(type == 'mobile-tablet'){
            Type = 'Mobile' || 'Tablet'
        }else if(type == 'laptop-pc'){
            Type = 'Laptop' || 'PC'
        }else if(type == 'tv'){
            Type = 'TV'
        }else if(type == 'camera'){
            Type = 'Camera'
        }else if(type == 'appliance'){
            Type = 'Appliance'
        }
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
                try{
                    Product.find({ productType: Type })
                      .skip((resPerPage * page) - resPerPage)
                      .limit(resPerPage)
                      .exec((err, products) => {
                        if(err){
                            return next(err);
                        }else{
                            Product.countDocuments().exec((err, count) => {
                                if(err){
                                    return next(err);
                                }else{
                                    res.render('pages/products/finder/type' , { 
                                        products: products,
                                        brands: functions.removeDups(array),
                                        typename: Type,
                                        successMgs: successMgs,
                                        noMessages: !successMgs,
                                        messages: messages,
                                        current: page,
                                        pages: Math.ceil(count / resPerPage)
                                    });
                                }
                            });   
                        }
                    });
                }catch(err){
                    res.redirect('back');
                }
            }
        });
    },
    GetBrandProducts: (req, res) => {
        var messages    = req.flash('error'),
            successMgs  = req.flash('success')[0],
            array      = [],
            brand       = req.params.brand,
            resPerPage  = 25,
            page        = req.params.page || 1;
        Product.find((error, items) => {
            if(error){
                req.flash(
                    'error_msg',
                    'There is something wrong in loading the page'
                );
                res.redirect('/');
            }else{
                try{
                    items.forEach((item) => {
                        array.push(item.brand);
                    });
                    Product.find({ brand : brand })
                      .skip((resPerPage * page) - resPerPage)
                      .limit(resPerPage)
                      .exec((err, products) => {
                        if(err){
                            return next(err);
                        }else{
                            Product.countDocuments().exec((err, count) => {
                                if(err){
                                    return next(err);
                                }else{
                                    res.render('pages/products/finder/brand' , { 
                                        products: products,
                                        brands: functions.removeDups(array),
                                        brandname: brand,
                                        successMgs: successMgs,
                                        noMessages: !successMgs,
                                        messages: messages,
                                        current: page,
                                        pages: Math.ceil(count / resPerPage)
                                    });
                                }
                            });   
                        }
                    });
                }catch(err){
                    res.redirect('back');
                }
            }
        });
    }
}