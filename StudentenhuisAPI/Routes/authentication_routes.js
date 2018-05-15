//
// authenticatie route
//

// Variabelen
const routes = require('express').Router();
const AuthController = require('../controllers/authentication_controller');

//Router endpoints die we hebben.
routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);

//Exporteren van de routes
module.exports = routes;