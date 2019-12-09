const express = require ('express');
const userController = require ('../Controllers/user');

const Router = express.Router ();

Router.get ('/', userController.getUsers);
Router.get ('/show/:id', userController.getUser);
Router.get ('/show/', userController.getUserError);
Router.get ('/byName/', userController.getUsername);
Router.post ('/register', userController.registerUser);
Router.post ('/login', userController.loginUser);
Router.patch ('/:id', userController.updateUser);
Router.delete ('/:id', userController.deleteUser);

module.exports = Router; 