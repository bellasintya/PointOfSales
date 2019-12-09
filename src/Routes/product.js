const express = require ('express');
const productController = require ('../Controllers/product');

const Router = express.Router ();

Router.get ('/', productController.getProducts);
Router.post ('/', productController.postProducts);
Router.patch ('/:id', productController.updateProduct);
Router.delete ('/:id', productController.deleteProduct);
 
Router.get ('/sort', productController.sortProducts);
Router.get ('/search', productController.searchProduct);
Router.get ('/show/:id', productController.getProduct);
Router.patch ('/add/:id', productController.addQuantity);
Router.patch ('/reduce/:id', productController.reduceQuantity);
Router.get ('/page/:page', productController.pageProducts);

module.exports = Router; 