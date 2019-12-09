const express = require ('express');
const categoryController = require ('../Controllers/category');

const Router = express.Router ();

Router.get ('/', categoryController.getCategories);
Router.get ('/show/:id', categoryController.getCategories);
Router.get ('/byName/', categoryController.getCategoryByName);
Router.post ('/', categoryController.postCategories);
Router.patch ('/:id', categoryController.updateCategory);
Router.delete ('/:id', categoryController.deleteCategory);

module.exports = Router;