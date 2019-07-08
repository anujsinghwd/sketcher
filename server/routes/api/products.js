const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Input Validation
const validateAddProductInput = require('../../validation/addProducts');

// Load users Model
const Product = require('../../models/Products');

// @route   POST api/products
// @dsec    Create Product
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),(req, res) => {

    const { errors, isValid } = validateAddProductInput(req.body);

    if(!isValid){
        // Return any error with 400 status
        return res.status(400).json(errors);
    }

    let image = null;
    // Send comma seprated images
    if(typeof req.body.images !== 'undefined'){
        image = req.body.images.split(',');
    }

    const brandInfo = {id: req.body.brandId, name: req.body.brandName};

    const newProduct = new Product({
        user: req.user.id,
        name: req.body.name,
        desc: {
            lang: "en",
            val: req.body.desc
        },
        lname: req.body.lname,
        images: image,
        brand: brandInfo
    });
     newProduct.save().then(post => res.json(post));
});

// @route   DELETE api/products/:id
// @dsec    DELETE product
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        // Check for product owner
        if(product.user.toString() !== req.user.id){
            return res.json(401).json({notauthorized: 'User not authorized'});
        }

        // Delete Product
        product.remove().then(()=> res.json({success: true}))
                    .catch(err => res.status(404).json({productnotfound: 'Product not found'}));
    })
    .catch(err => res.status(400).json({noproductfound: 'no product found with that ID'}));
});

// @route   GET api/products/:id
// @dsec    GET Single product
// @access  Public
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        res.json(product);
    })
    .catch(err => res.status(400).json({noproductfound: 'no product found with that ID'}));
});


module.exports = router;