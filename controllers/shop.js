const Product = require('../models/Product');
const { checkout } = require('../routes/shop');
const Cart = require('../models/Cart');

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

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail',{
      product: product,
      path: '/products',
      pageTitle: product.title
    });
  });
  // console.log(prodId);
}

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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts  
      });
    });
  });
  
}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  // console.log(prodId);
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.getOrders = (req,res,next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  });
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}