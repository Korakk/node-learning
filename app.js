const express = require('express');
const app = express(); //Spin up express app.
const morgan = require('morgan'); //Request Logger
const bodyParser = require('body-parser');//Parse request body
const mongoose = require('mongoose'); //MongoDB use package.

const productRoutes = require('./api/routes/products'); //ruta per tal de dir a quin fitxer anar a buscar les rutes (get, post ...)
const orderRoutes = require('./api/routes/orders');

//MongoDB connection PATH.
mongoose.connect("mongodb://admin:"+ process.env.MONGO_ATLAS_PW + "@node-rest-shop-shard-00-00-dp5ql.mongodb.net:27017,node-rest-shop-shard-00-01-dp5ql.mongodb.net:27017,node-rest-shop-shard-00-02-dp5ql.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true", {
    useNewUrlParser: true
});

//Middlewares
//Indicate the app that has to use morgan to take logs.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

//Before any request is done we have to "disable" CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //second parameter specifies the url that can have acces, no url means all can access.
    //HEADERS YOU WANT TO SUPPORT
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authoritzation'
        );
    if(req.method === 'OPTIONS') {
        //HTTP VERBS THAT YOU WANT TO SUPPORT.
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products',productRoutes);
app.use('/orders', orderRoutes);

//Handle all requests errors here, because if I arrive here
// it means that any request has matched with the other file ones.
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error); //forward the error request instead of the original one essentially.
});

//Server errors handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;