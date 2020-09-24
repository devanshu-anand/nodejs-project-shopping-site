const fs = require('fs');
const path = require('path');
const Cart = require('./Cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
        // console.log(JSON.parse(fileContent));
      cb(JSON.parse(fileContent));
    }
  });
};

const getUniqueId = () => {
  const randNum = Math.floor(Math.random() * 1000);
  const d = new Date();
  const currentTime = d.getTime();
  return `${randNum}-${currentTime}`;
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
      else {
          this.id = getUniqueId();
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
          });
      }
      
    });
  }

  static fetchAll(cb) {
    try{
        getProductsFromFile(cb);
    }
    catch(err){
        console.log(err);
    }
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err) {
          Cart.deleteProduct(id, product.price);
        }
        // console.log(err);
      });
      // cb(product);
    });
  }
};