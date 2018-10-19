const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //Special type, that its a serial ID.
    name: String,
    price: Number

});

module.exports = mongoose.model('Product', productSchema)