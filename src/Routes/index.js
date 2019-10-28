const express = require ('express');
    product = require ('./product'),
    category = require ('./category'),
    transaction = require ('./transaction'),
    user = require ('./user'),
    {validateUser} = require ('../Helpers/middleware');

const Router = express.Router ();

Router.get('/', (req, res) => {
    res.json({
        message: "Point Of Sales RESTful API",
        author: "Bella Sintya"
    });
})

// Router.use ('/product', validateUser, product);
// Router.use ('/category', validateUser, category);

Router.use ('/product', product);
Router.use ('/category', category);
Router.use ('/user', user);
Router.use ('/transaction', transaction);

//Router.use ('/transaction', validateUser, transaction);

module.exports = Router;