const express = require('express');
const app = express(); //Spin up express app.

const productRoutes = require('./api/routes/products'); //ruta per tal de dir a quin fitxer anar a buscar les rutes (get, post ...)
const orderRoutes = require('./api/routes/orders');
//Middlewares
app.use('/products',productRoutes);

app.use('/orders', orderRoutes);
module.exports = app;