var Product = require('../../../models/product');
module.exports = {
    GetNewProductPage: (req , res) => {
        var messages = req.flash('error');
        res.render('pages/products/access/new' , {
            messages: messages
        });
    },
    PostNewProductPage: (req , res) => {
        var errors     = [],
            {
                author, productType, brand, model, screensize, processor, 
                ram, storage, img, quantity, price, discount
            } = req.body,
            newproduct = new Product({
                author: req.body.author,
                productType: req.body.productType,
                brand: req.body.brand,
                model: req.body.model,
                screensize: req.body.screensize,
                processor: req.body.processor,
                ram: req.body.ram,
                storage: req.body.storage,
                img: req.body.img,
                quantity: req.body.quantity,
                price: req.body.price,
                discount: req.body.discount,
            });
        newproduct.save().then(productCreated => {
            req.flash('success_msg', 'You added the product successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! additing process is failed' });
            res.render('pages/products/access/new' , {
                errors,
                author, productType, brand, model, screensize, processor, 
                ram, storage, img, quantity, price, discount
            });
        });
    }
}