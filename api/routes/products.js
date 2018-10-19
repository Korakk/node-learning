const express = require('express');
const router = express.Router();

 //no fiquem /products pq al app.js ja ens hem asegurat que tot el que ens arribi vagi a /products.
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /products"
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product//To confirm we got the correct product.
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;//params--> object with all the params we have.
    if ( id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id:id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Updated product!"
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Deleted product!"
    });
});


module.exports = router;