const express = require ('express');
const userController = require ('../Controllers/user');
const {validateUser} = require ('../Helpers/middleware');

const Router = express.Router ();

Router.post ('/register', userController.registerUser);
Router.post ('/login', userController.loginUser);
Router.get ('/', userController.getUsers);

//without token 
Router.get ('/show/:id', userController.getUser);
Router.patch ('/:id', userController.updateUser);
Router.delete ('/:id', userController.deleteUser);

// with token
// Router.get ('/:id', validateUser, userController.getUser);
// Router.patch ('/:id', validateUser, userController.updateUser);
// Router.delete ('/:id', validateUser, userController.deleteUser);

module.exports = Router; 