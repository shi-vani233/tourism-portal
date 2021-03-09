var bcrypt = require('bcrypt');
const express = require('express');
var User = require('../models/users');
var Order = require('../models/orders');
var Package = require('../models/packages');
const jwt = require('jsonwebtoken');
const { connect } = require('mongoose');
var router = express.Router();

// function verifyToken(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).send('Unauthorized request')
//     }
//     let token = req.headers.authorization.split('')[1]
//     if (token == 'null') {
//         return res.status(401).send('Unauthorized request')
//     }
//     let payload = jwt.verify(token, 'secretKey')
//     if (!payload) {
//         return res.status(401).send('Unauthorized request')
//     }
//     req.userId = payload.subject
//     next()
// }

router.get('/', (req, res, next) => {
    res.send("from API");
});

router.post('/signup', (req, res, next) => {
    console.log("register post");
    addToDB(req, res);
});
async function addToDB(req, res) {
    var user = new User({
        name: req.body.name,
        password: User.hashPassword(req.body.password),
        phone_no: req.body.phone_no,
        email: req.body.email
    })
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
}

router.post('/order/:name/:description/:email/:price', (req, res, next) => {
    console.log("order");
    orderToDB(req, res);
});
async function orderToDB(req, res) {
    var order = new Order({
        email: req.params.email,
        packname: req.params.name,
        description: req.params.description,
        price: req.params.price
    })
    order.save((error, ordered) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                msg: "purchase complete,enjoy your Holiday!"
            })
        }
    })
}
router.post('/fetch', function(req, res, next) {
    console.log("get all packages");
    Package.find({}).exec(function(err, packages) {
        if (err) {
            console.log("error");
        } else {
            res.json({
                pack: packages,
                msg: "packages sent"
            })
        }
    });
});

router.post('/showorder/:email', function(req, res, next) {
    Order.find({ email: req.params.email }).exec(function(err, order) {
        if (err) {
            console.log("error");
        } else {
            res.json({
                sent_order: order
            })
        }
    });
});

router.post('/statewise/:state', function(req, res, next) {
    Package.find({ state: req.params.state }).exec(function(err, packages) {
        if (err) {
            console.log("error");
        } else {
            res.json({
                pack: packages
            })
        }
    });
});
router.post('/login', function(req, res, next) {
    // console.log(req.body);
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(user);
        if (err) {
            console.log(err);
            res.json({
                msg: "Error"
            })
        } else {
            if (!user) {
                res.json({
                    msg: "User does not exist"
                })
            } else {
                bcrypt.compare(req.body.password, user.password).then(match => {
                    if (match) {
                        console.log("success");
                        let payload = { subject: user._id }
                        let token = jwt.sign(payload, 'secretkey')
                            //res.status(200).send({ token })
                        res.status(200).json({
                            token: token,
                            user: user,
                            msg: "Login successfull"
                        })
                    } else {
                        console.log("incorrect password");
                        res.json({
                            msg: "Incorrect Password!"
                        })
                    }
                }).catch(err => {
                    console.log("Something went wrong");
                    res.json({
                        msg: "Something went wrong"
                    })

                })
            }
        }
    })
});
module.exports = router;