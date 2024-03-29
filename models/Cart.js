const fs = require('fs');
const path = require('path');

const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'cart.json'
);



module.exports = class Cart {

    static addProduct(id, productPrice){
        // Fetch the previous cart 
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            
            if(!err){
                cart = JSON.parse(fileContent);        
            }
        
        // analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id); // 0,1,2,3,4,5,6
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if(existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [ ...cart.products ];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = { id: id, qty: 1 };
                cart.products = [ ...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
        
    }
    
    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            
            if(err){
                return;
            }
            // console.log(fileContent);

            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            // console.log(updatedCart);
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(!cart){
                cb(null);
            }
            else{
                cb(cart);
            }
        });
    }


}