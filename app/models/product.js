var mongoose = require('mongoose'),
    db       = mongoose.connection,
    product  = mongoose.Schema({
        author: {
            type: String,
            required: true
        },
        productType: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        screensize: {
            type: Number,
            required: true
        },
        processor: {
            type: String,
            required: true
        },
        ram: {
            type: Number,
            required: true
        },
        storage: {
            type: Number,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        }
    }),
    Product  = mongoose.model('Product' , product , 'product');
db.once('open' , () => { console.log('connection with product is succeeded') });
db.on('error' , console.error.bind(console , 'connection with product is failed'));
module.exports = Product;