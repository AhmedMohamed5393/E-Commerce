var Product = require('../models/product');
module.exports = {
    checkProductOwnership: (req , res , next) => {
        if(req.isAuthenticated()){
            Product.findById(req.params.id).then(product => {
                if(product.author == req.user.username){
                    next();
                }else{
                    res.redirect('back');
                }
            }).catch(err => {
                console.log(err);
                res.redirect('back');
            });
        }else{
            console.log(err);
            res.redirect('back');
        }
    }
}