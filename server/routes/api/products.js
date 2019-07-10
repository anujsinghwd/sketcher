const express = require('express');
const router = express.Router();
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

// @route   POST api/products/update
// @dsec    Update Product
// @access  Private
router.post('/update', passport.authenticate('jwt', { session: false }),(req, res) => {
      let desc = req.body.desc;
      let name = req.body.name;
      let lname = req.body.lname;
      let brandName = req.body.brandName;
      Product.findById(req.body.id)
        .then(product => {
            if(desc){
              product.desc.val = desc;
            }
            if(name){
              product.name = name;
            }
            if(lname){
              product.lname = lname;
            }
            if(brandName){
              product.brand.name = brandName;
            }
            product.save().then( product => res.json(product));
        })
        .catch(err => res.status(400).json({noproductfound: 'no product found with that ID'}));
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

// @route   GET api/products/:skip/:limit
// @dsec    GET products
// @access  Public
router.get('/:skip/:limit', (req, res) => {
    let skips = (req.params.skip) ? req.params.skip : 0;
    let limits = (req.params.limit) ? req.params.limit : 10;
    Product.find({}).select({ "name": 1, "lname": 1, "brand": 1, "desc": 1}).skip(parseInt(skips)).limit(parseInt(limits))
        .sort({date: -1})
        .then(products => res.json(products))
        .catch(err => res.status(400).json({noproductfound: 'no product found'}));
});


module.exports = router;
