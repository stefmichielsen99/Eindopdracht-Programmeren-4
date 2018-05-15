//
// authenticatie route
//

// Variabelen
const routes = require('express').Router();
const AuthController = require('../controllers/authentication_controller');

//Router endpoints die we hebben.
routes.post('/login', AuthController.login);
routes.post('/login', AuthController.register);

//Exporteren van de routes
module.exports = routes;