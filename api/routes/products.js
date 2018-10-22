const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

//implement storage strategy
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');//null makes that if not passed this not throws error.
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        //accept file
        cb(null, true);
    } else {
        //reject file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, limits: {
    fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});//we can pass a config to multer.


 //no fiquem /products pq al app.js ja ens hem asegurat que tot el que ens arribi vagi a /products.
router.get('/', ProductsController.products_get_all);

//many handlers as u want.
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get('/:productId', ProductsController.products_get_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);


module.exports = router;