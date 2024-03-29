const path = require('path');
const express = require('express');
const router = express.Router();
// const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

// const products = [];

router.get('/add-product',adminController.getAddProductPage);

router.post('/add-product', adminController.postAddProductPage);

router.get('/products',adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProductPage);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);



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