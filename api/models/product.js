const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //Special type, that its a serial ID.
    name: { type: String, required: true},
    price: { type: Number, required: true}

});

module.exports = mongoose.model('Product', productSchema)