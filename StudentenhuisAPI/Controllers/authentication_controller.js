//
//Authenticatie controller
//

//Variabelen
const ApiError = require('../ApiError');
const auth = require('../util/auth/authentication');
// in voorbeeld werd een personlist gemaakt waarin de personen werden opgeslagen
//maar hier is dat een db
const database = require('../Database/databaseconnection');
const token = require('../util/auth/authentication');
const assert = require('assert')



//De authentication moet sws worden geëxporteerd daarom hetvolgende:
module.exports = {

    validateToken(req, res, next) {
        // Uncommend om te testen
        //console.log('validateToken called!')
        
        /**
         * A token can be sent in the body of a request, via a query parameter (in the URL),
         * or as an HTTP header. We choose the header variant.
         */

        const token = req.header('x-access-token') || '';
        
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                //Invalid token gegeven
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else { 
                console.log('Authenticated! Payload: ')
                console.dir(payload);
                
                 req.user = payload.sub;
                 next();
            }
        });
    },

    /**
     * Log a user in by validating the email and password in the request.
     * Email is supposed to be more unique than a username, so we use that for identification.
     * When the email/password combination is valid a token is returned to the client. 
     * The token provides access to the protected endpoints in subsequent requests, as long 
     * as it is valid and not expired.
     */

    login (req, res, next) {
        //Verifieer dat de input klopt
        try {
            assert(typeof (req.body.Email) === 'string', 'email must be a string.')
            assert(typeof (req.body.Password) === 'string', 'password must be a string.')
        }
        catch (ex) {
            console.log(ex)
            res.json(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief' , 412))
            return
        }

        let email= req.body.Email;
        let password = req.body.Password;

        let sql = "SELECT Email,Password FROM user WHERE Email = '" +email+ "'AND Password = '" + password + "'";
        database.connection.query(sql, (error, results) => {
            console.log(results)
            if (error) {
                 console.log("error ocurred",error);
            }else if(results.length >0){
                console.log('The solution is: ', results);
                    let token2 = token.encodeToken(email);
                    res.status(200).json(token2);
                } else {
                    res.json(new ApiError('Niet geautoriseerd', 401))
                }
            })
                    
    },

    register(req, res, next) {
    
        let firstname = req.body.Voornaam;
        let lastname = req.body.Achternaam;
        let email = req.body.Email;
        let password = req.body.Password;
        
        try {
            assert(typeof (req.body.Voornaam) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.Achternaam) === 'string', 'lastname must be a string.')
            assert(typeof (req.body.Email) === 'string', 'email must be a string.')
            assert(typeof (req.body.Password) === 'string', 'password must be a string.') 
            assert(firstname.length > 1, 'firstname must be longer than one character') 
            assert(lastname.length > 1, 'lastname must be longer than one character') 
            assert(email.length > 4, 'email must be longer than one character') 
            assert(password.length > 4, 'firstname must be longer than one character') 
        }
        catch (ex) {
            console.log(ex)
            res.json(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief' , 412))
            return
        }
        let sql = "INSERT INTO user (`Voornaam`, `Achternaam`, `Email`, `Password`) VALUES ('"+ firstname +"', '"+ lastname +"', '"+ email +"', '"+ password +"')";
        
            console.log(sql);
            database.connection.query(sql, (error, results) => {
                
                if(error){
                    console.log(error);
                    res.status(401).json(new ApiError("Niet geautoriseerd", 401));
                } else {
                    let token2 = token.encodeToken(email);
                    res.status(200).json(token2);
                                                
                }
                        
                
            })

        }
    }
        
        
    
    



