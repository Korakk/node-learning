const express = require('express');
const app = express(); //Spin up express app.

//Middlewares
app.use((req, res, next) =>{
    res.status(200).json({
        message: "It works!"
    });//send a json response
});

module.exports = app;