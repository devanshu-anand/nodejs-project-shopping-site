const Product = require('../models/Product');
const { checkout } = require('../routes/shop');

exports.getProducts = (req, res, next) => {
  try{
    Product.fetchAll(products => {
        // console.log("products on model" + products, typeof products);
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'All Products',
          path: '/products',
        });
      });
  }
  catch(err){
      console.log(err);
  }
    
};

exports.getIndex = (req,res,next) => {
  Product.fetchAll(products => {
    // console.log("products on model" + products, typeof products);
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  }); 
}

exports.getCart = (req,res,next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart'
  });
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}