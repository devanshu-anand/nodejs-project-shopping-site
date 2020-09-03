// const products = [];
const Product = require('../models/Product');

exports.getAddProductPage = (req,res,next) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add Products',
        path: '/admin/add-product',
        productCss: true,
        formCss: true,
        productPage: true
    });
    // next();
}

exports.postAddProductPage = (req,res,next) => {
    // console.log(req.body);
    // products.push({title: req.body.title});
    let product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    // console.log('shop.js',adminData.products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    // const products = adminData.products;
    const products = Product.fetchAll();
    // Product.fetchAll(products => {
    //     console.log("products on model: " + products);
    //     console.log(typeof products);
    //     // res.render('shop',{
    //     // prods: products,
    //     // pageTitle: 'My Shop',
    //     // path:'/',
    //     // hasProducts: products.length > 0,
    //     // productCss: true,
    //     // shopPage: true });

    // });
    res.render('shop',{
        prods: products,
        pageTitle: 'My Shop',
        path:'/',
        hasProducts: products.length > 0,
        productCss: true,
        shopPage: true }); //render function to render the dynamic templates
}