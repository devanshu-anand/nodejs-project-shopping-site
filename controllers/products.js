const Product = require('../models/Product');

exports.getAddProductPage = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProductPage = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  try{
    Product.fetchAll(products => {
        // console.log("products on model" + products, typeof products);
        res.render('shop', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS: true
        });
      });
  }
  catch(err){
      console.log(err);
  }
    
};