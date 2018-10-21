const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
//Create user
router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                //409 Conflict.
                //422 Unprocessable entity.
                return res.status(409).json({
                    message: "User with that mail exists."
                });
            } else {
                //Encrypts the password. Adding string at the start and the end of the plain text and then hashes it.
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                        .then( result => {
                            console.log(result);
                            res.status(201).json({
                                message: "User created correctly"
                            });
                        })
                        .catch( err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });    
                    }
                });
            }
        });    
});

router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: "User deleted",
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
module.exports = router;