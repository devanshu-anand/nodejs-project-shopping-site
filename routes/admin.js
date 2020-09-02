const path = require('path');
const express = require('express');
const router = express.Router();
// const rootDir = require('../util/path');
const productsController = require('../controllers/products');

// const products = [];

router.get('/add-product',productsController.getAddProductPage);

router.post('/add-product', productsController.postAddProductPage);



// router.get('/add-product',(req,res,next) => {
//     // res.sendFile(path.join(rootDir,'views','add-product.html'));
//     res.render('add-product', {pageTitle: 'Add Products',path: '/admin/add-product', productCss: true, formCss: true, productPage: true});
//     // next();
// });

// router.post('/add-product', (req,res,next) => {
//     // console.log(req.body);
//     products.push({title: req.body.title});
//     res.redirect('/');
// });



// exports.routes = router;
// exports.products = products; 

module.exports = router;