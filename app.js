const express = require('express');
const app = express(); //Spin up express app.
const morgan = require('morgan'); //Request Logger

const productRoutes = require('./api/routes/products'); //ruta per tal de dir a quin fitxer anar a buscar les rutes (get, post ...)
const orderRoutes = require('./api/routes/orders');
//Middlewares
//Indicate the app that has to use morgan to take logs.
app.use(morgan('dev'));

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