const http = require('http');               // node http module importing core package     
const express = require('express');         // importing express node framework for creating server 
const bodyParser = require('body-parser');  // response body parser package to convert encoded response 
const path = require('path');               // node path module importing core package
const rootDir = require('./util/path');     // import helper function, to find out the root directory 

const app = express();                      // initalizing express app
// we have to import handlerbars template engine to use it
// const expressHandlebars = require('express-handlebars');
//node syntax
// const route = require('./routes');
// console.log(http);

//Template Engine

// ejs automatically extends in the express
app.set('view engine','ejs');                //global function to the set the configuration globally 
app.set('views','views');                    // view engine and views are express expressions                     

// app.engine('hbs', expressHandlebars());
// app.engine('hbs', expressHandlebars({
//     defaultLayout: 'main-content',
//     layoutsDir: 'views/layouts',
//     extname: 'hbs'
// }));
// app.set('view engine', 'hbs');
// app.set('views','views');


// pug automatically extends in the express
// app.set('view engine','pug');                //global function to the set the configuration globally 
// app.set('views','views');                    // view engine and views are express expressions                     

const adminData = require('./routes/admin'); //importing routing functions from routes files 
const shopRoute = require('./routes/shop');

// middleware
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname,"public"))); //use folder as it is from a directory -- using static method

app.use('/admin',adminData.routes); 
app.use(shopRoute);

app.use((req,res,next) => {
    // res.status(404).sendFile(path.join(rootDir,'views','404.html'));
    res.status(404).render('404',{pageTitle: '404 Page not found'});

});



// node syntax
// const server = http.createServer(route.handler);
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
