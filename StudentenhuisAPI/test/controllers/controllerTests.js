/**
 * Voor de testen moeten er minimaal 7 tests worden geschreven en elke endpoint moet worden getest.
 * Hierbij test je niet alleen de verwachte correcte werking, maar je test vooral ook requests waarbij fouten
 *zullen optreden – bijvoorbeeld wanneer een gebruiker een maaltijd wil verwijderen die hij niet zelf
 *heeft aangemaakt, of een gebruiker zich aan wil melden voor een maaltijd maar reeds aangemeld is.
 */
 const chai = require('chai');
 const assert = require('chai').assert;
 const controllerstud = require('../../controllers/studentenhuis_controller');
 const controllermltd = require('../../controllers/maaltijd_controller');
 const controllerdeeln = require('../../controllers/deelnemer_controller');
 const controllerauth = require('../../controllers/authentication_controller');

 let validToken

 describe('App', function(){
     describe('ControllerStudentenhuis', () =>{
         //Test Hier
     });
     describe('ControllerMaaltijd', () => {
         //Test Hier
     });
     describe('ControllerDeelnemer', () => {
        //Test Hier
     });
     describe('ControllerAuthentication', () => {
        describe('Registration', () => {
            it('should return a token when providing valid information', (done) => {
                //Manier vinden om te testen / Hoe zie je of ie slaagt?
                chai.request(server)
                .post(endpoint)
                .send({
                    'Voornaam': ' FirstName ',
                    'Achternaam': ' LastName ',
                    'Email': 'tst@test.com',
                    'Password': 'secret'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    const response = res.body;
                    response.should.have.property('token').which.is.a('string');
                    response.should.have.property('email').which.is.a('string');

                    // Export the aquired token for other testcases (if necessary).
                    validToken = res.body.token;
                    module.exports = {
                        token: validToken
                    };
                    done();
                });
            });
        });
            
     });
 });

 