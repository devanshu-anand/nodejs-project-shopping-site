const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();


router.get('/', (req,res,next) => {
    // console.log('shop.js',adminData.products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    const products = adminData.products;
    res.render('shop',{prods: products, pageTitle: 'My Shop',path:'/', hasProducts: products.length > 0, productCss: true, shopPage: true }); //render function to render the dynamic templates
});

module.exports = router;