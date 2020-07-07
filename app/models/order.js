var mongoose = require('mongoose'),
    db       = mongoose.connection,
    order    = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        cart: {
            type: Object, 
            required: true
        },
        address: {
            type: String, 
            required: true
        },
        name: {
            type: String, 
            required: true
        },
        phone: {
            type: Number, 
            required: true
        },
        paymentId: {
            type: String, 
            required: true
        }
}),
    Order    = mongoose.model('Order' , order , 'order');
db.once('open' , () => { console.log('connection with order is succeeded') });
db.on('error' , console.error.bind(console , 'connection with order is failed'));
module.exports = Order;