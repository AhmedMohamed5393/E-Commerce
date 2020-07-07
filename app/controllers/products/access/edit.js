var Product = require('../../../models/product');
module.exports = {
    GetEditProductPage: (req , res) => {
        var messages = req.flash('error');
        Product.findById(req.params.id).then(productDetails => {
            res.render('pages/products/access/edit' , {
                product: productDetails,
                messages: messages
            });
        }).catch(err => {
            res.redirect('back');
        });
    },
    PutEditProductPage: (req , res) => {
        var errors     = [],
            {
                author, productType, brand, model, screensize, processor, 
                ram, storage, img, quantity, price, discount
            } = req.body;
        Product.findByIdAndUpdate(req.params.id , {
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
        }).then(updatedProduct => {
            req.flash('success_msg', 'You updated the product successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! editing process is failed' });
            res.render('pages/products/access/edit' , {
                errors,
                author, productType, brand, model, screensize, processor, 
                ram, storage, img, quantity, price, discount
            });
        });
    },
    DeleteProduct: (req , res) => {
        var errors = [];
        Product.findByIdAndDelete(req.params.id).then(deletedproduct => {
            req.flash('success_msg', 'You deleted the product successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! deleting process is failed' });
            res.render('pages/products/access/show' , errors);
        });
    }
}