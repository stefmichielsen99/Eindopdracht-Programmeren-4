//
//Authenticatie controller
//

//Variabelen
const ApiError = require('../ApiError');
const auth = require('../util/auth/authentication');
// in voorbeeld werd een personlist gemaakt waarin de personen werden opgeslagen
//maar hier is dat een db
const database = require('../Database/databaseconnection');

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

            /**
                 * The payload contains the values that were put in it via the sub-field.
                 * We could use those in our application to trace actions that a user performs, 
                 * such as monitor CRUD operations, by storing the user ID in a logging database.
                 * Example: User 12345 performed an update operation on item xyz on date dd-mm-yyyy.
                 * To do so, we attach the payload.sub (or only a part of that) to the request object.
                 * In this way, every next express handler has access to it - and could do 
                 * something smart with it.  
                 */
                
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
     * 
     * Security issue: the password is probably typed-in by the client and sent as 
     * plain text. Anyone listening on the network could read the password. The 
     * connection should therefore be secured and encrypted.
     */

    login (req, res, next) {
        //Verifieer dat de input klopt
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        // Verify that the email exists and that the password matches the email.
        personlist.getByEmail(req.body.email, (err, result) => {
            // console.log(result.toString())
            if(err) {
                // Email does not exist
                next(new ApiError('Invalid credentials, bye.', 401))
            } else {
                bcrypt.compare(req.body.password.trim(), result.password, (err, success) => {
                    if (success) {
                        // console.log('passwords DID match, sending valid token')
                        // Create an object containing the data we want in the payload.
                        const payload = {
                            user: result.email,
                            role: 'admin, user'
                        }
                        // Userinfo returned to the caller.
                        const userinfo = { 
                            token: auth.encodeToken(payload),
                            email: result.email
                        }
                        res.status(200).json(userinfo).end()
                    } else {
                        // console.log('passwords DID NOT match')
                        next(new ApiError('Invalid credentials, bye.', 401))
                    }
                })
            }
        })
    },
    
    /**
     * Register a new user. The user should provide a firstname, lastname, emailaddress and 
     * password. The emailaddress should be unique when it exists, an error must be thrown.
     * The password will be encrypted by the Person class and must never be stored as plain text!
     */
    register(req, res, next) {

        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }

        const person = new Person(
            req.body.firstname, 
            req.body.lastname,
            req.body.email,
            req.body.password
        )
        
        personlist.add(person, (err, result) => {
            if(err) {
                // Duplicate email found
                const error = new ApiError(err, 412)
                next(error)
            } else {
                // Unique email person was added to the list.
                // Choices we can make here: 
                // - return status OK, user must issue separate login request, or
                // - return valid token, user is immediately logged in.

                // Create an object containing the data we want in the payload.
                const payload = {
                    user: req.body.email,
                    role: 'admin, user'
                }
                // Userinfo returned to the caller.
                const userinfo = {
                    token: auth.encodeToken(payload),
                    email: req.body.email
                }
                res.status(200).json(userinfo).end()
            }
        })
    }

}

