const fs = require('fs');
const path = require('path');

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = getUniqueId();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
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
    })
  }
};