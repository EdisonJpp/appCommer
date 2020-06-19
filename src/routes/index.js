const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
const publicationControllers = require('../controllers/publicationController');
const CategorieController = require('../controllers/categorieController');
// const provinceController = require('../controllers/provinceController');
// const Join = require('../controllers/join-user-publication');
const shoppingCartController = require('../controllers/carritoController');





module.exports = function () {

    // users's routes
    router.get('/users', userControllers.getUsers);
    router.post('/users', userControllers.addUser);
    router.get('/users/:id', userControllers.getUserById);
    router.put('/users/:id', userControllers.updateUserById);
    // router.put('/users/password/:id', userControllers.updatePasswordById);
    
    router.delete('/users/:id', userControllers.deleteUser);
    router.post('/login', userControllers.authUser);
    // publication's routes
    router.get('/publications', publicationControllers.getPublications);
    router.get('/publications/:id', publicationControllers.findById);
    router.post('/publications', publicationControllers.AddPublication); 
    router.delete('/publications/:id', publicationControllers.deletePublication);
    //  users's publications 
    router.get('/mypublications/:users_id', publicationControllers.myPublications);
    // province 
    // router.get('/provinces',provinceController);
    router.get('/category/:categoryId', publicationControllers.getPostByCategory);
    // categories
    router.get('/categories', CategorieController.categories);
    router.get('/categories/:id', CategorieController.categorieById);
    // shoppingCar
    router.get('/shoppingCart', shoppingCartController.getShoppingCart );
    router.get('/shoppingCart/:userId', shoppingCartController.findCartById);
    router.post('/shoppingCart' , shoppingCartController.addShoppingCart);
    router.delete('/shoppingCart/:id', shoppingCartController.deleteShoppingCart);
    // router.pos



    return router;
};