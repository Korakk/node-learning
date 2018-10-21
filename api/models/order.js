const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //Special type, that its a serial ID.
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1 }//default is not required field but if no value is passed we will save a 1 to the DB.
});

module.exports = mongoose.model('Order', orderSchema)