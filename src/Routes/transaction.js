const express = require ('express');
const transactionController = require ('../Controllers/transaction');

const Router = express.Router ();

Router.get ('/', transactionController.getTransactions);
Router.get ('/show/:id', transactionController.getTransaction);
Router.get ('/details/:id', transactionController.getDetailTransaction);
Router.post ('/', transactionController.addTransaction);
Router.post ('/details', transactionController.addDetails);

module.exports = Router;