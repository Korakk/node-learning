const mongoose = require('mongoose');
const Product = require('../models/product.js');


exports.products_get_all = (req, res, next) => {
    Product
    .find()//Without parameters it will get all the options.
    .select("name price _id productImage")//fetch this field no other data.
    .exec()
    .then(docs => {
        if(docs.length >= 0){
            const response = {
                count: docs.length,
                products: docs.map( doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        //extra information, about how to do a get.
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })//map --> map it into a new array.
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message: "No entries found"
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err    
        });
    });

}

exports.products_create_product = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage: result.productImage,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }

            }//To confirm we got the correct product.
        });

    })
    .catch(err => console.log(err));
}

exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;//params--> object with all the params we have.
    Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then(doc => {
        console.log("From Database: " + doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: "GET_ALL_PRODUCTS",
                    url: 'http://localhost:3000/products/'               }
            });
        } else {
            res.status(404).json({message: "No result found, by the id you search"})
        }
    }) 
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err});
    });
}

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value; //This will give us an updated object.
    }
    Product.update({ _id: id }, {$set: updateOps }) //2nd argument, how we want to update this.
        .exec()
        .then( result => {
            res.status(200).json({
                message: "Product updated",
                request:{
                    type: "GET",
                    url: "http://localhost:3000/products/" + id
                }
            });
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id})
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Product deleted",
            request:{
                type: "POST",
                url: "http://localhost:3000/products/",
                body: {name: "String" , price: "Number"}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}