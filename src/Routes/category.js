const express = require ('express');
const categoryController = require ('../Controllers/category');

const Router = express.Router ();

Router.get ('/', categoryController.getCategories);
Router.post ('/', categoryController.postCategories);
Router.patch ('/:id', categoryController.updateCategory);
Router.delete ('/:id', categoryController.deleteCategory);

module.exports = Router;