const express = require ('express');
const transactionController = require ('../Controllers/transaction');
const {validateUser} = require ('../Helpers/middleware');

const Router = express.Router ();

//without token 
Router.get ('/', transactionController.getTransactions);
Router.get ('/show/:id', transactionController.getTransaction);
Router.post ('/', transactionController.addTransaction);
Router.post ('/details', transactionController.addDetails);

// with token
// Router.get ('/', validateUser, transactionController.getTransactions);
// Router.get ('/:id', validateUser, transactionController.getTransaction);
// Router.post ('/', validateUser, transactionController.addTransaction);
// Router.post ('/details/:id', validateUser, transactionController.addDetails);

module.exports = Router;