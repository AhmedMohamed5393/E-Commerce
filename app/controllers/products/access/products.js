var Product   = require('../../../models/product'),
    functions = require('../../../middlewares/functions');
module.exports = {
    GetProductsPage: (req , res) => {
        var messages   = req.flash('error'),
            array      = [],
            noMatch    = null,
            successMgs = req.flash('success')[0],
            resPerPage = 25,
            page       = req.params.page || 1;
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
                        }).skip((resPerPage * page) - resPerPage)
                          .limit(resPerPage)
                          .exec((err, products) => {
                                if(err){
                                    return next(err);
                                }else{
                                    Product.countDocuments().exec((err, count) => {
                                        if(err){
                                            return next(err);
                                        }else if(count < 1){
                                           noMatch = 
                                            "No products match that query, please try again.";
                                        }
                                        res.render('pages/products/access/products',
                                         {
                                            products: products,
                                            noMatch: noMatch,
                                            successMgs:
                                             'Search has been done successfully',
                                            noMessages: null,
                                            messages: null,
                                            current: page,
                                            pages: Math.ceil(count / resPerPage)
                                         });
                                    });   
                                }
                            });
                    } catch (err) {
                        console.log(err);
                    }
                }else{
                    try {
                        Product.find({})
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
                                           res.render(
                                               'pages/products/access/products' ,
                                               { 
                                                 products: products,
                                                 brands: 
                                                   functions.removeDups(array),
                                                 noMatch: noMatch,
                                                 successMgs: successMgs,
                                                 noMessages: !successMgs,
                                                 messages: messages,
                                                 current: page,
                                                 pages: Math.ceil(count / resPerPage)
                                               }
                                           );
                                       }
                                   });   
                               }
                           });
                  } catch (err) {
                      console.log(err);
                  }
              }
          }
      });
    }
}