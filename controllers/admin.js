const Product = require('../models/Product');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
  };
  
  exports.postAddProductPage = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
  };

  exports.getEditProductPage = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
      if(!product){
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    });
    
  };

  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    // console.log(updatedTitle);
    const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedDesc,updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
    
  };

  exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
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

  
  