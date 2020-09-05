const Product = require('../models/Product');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/add-product', {
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

  exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
      res.render('admin/product-list', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        prods: products
      });
    });
  } 
  