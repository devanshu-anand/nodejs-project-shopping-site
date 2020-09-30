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
    Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    }).then(result => {
      console.log(result);
      console.log('Product Created !!');
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err);
    });
  };

  exports.getEditProductPage = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDesc;
      return product.save();
    })
    .then(result => {
      console.log('Product Updated !!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
  };

  exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('Product Destroyed !!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
    
  };

  exports.getProducts = (req,res,next) => {
    Product.findAll().
    then(products => {
      res.render('admin/product-list', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        prods: products
      });
    })
    .catch(err => {
      console.log(err);
    });
  } 

  
  