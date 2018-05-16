//
// Authentication using JSON Web Token (JWT)
// Save this e.g. as ./util/auth/authentication.js
//
const settings = require('../../confiq/confiq');
const moment = require('moment');
const jwt = require('jwt-simple');
const jws = require("jws");


//
// Encode (from username en id to token)
//
function encodeToken(UserID, Email) {
    const playload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: UserID,
        Email: Email   // can be any value or object you choose! 
    }
    return jwt.encode(playload, settings.secretkey)
}

//
// Decode (from token to username en id)
//
function decodeToken(token, callback) {

    try {
        const payload = jwt.decode(token, settings.secretkey)

        // Check if the token has expired.
        const now = moment().unix()
        if (now > payload.exp) {
            // console.log('Token has expired.')
            callback('Token has expired!', null)
        } else {
            callback(null, payload)
        }
    } catch (err) {
        callback(err, null)
    }
}

function decodePayload(jwt, options) {
    options = options || {};
    var decoded = jws.decode(jwt, options);
    if (!decoded) { return null; }
    var payload = decoded.payload;
  
    //try parse the payload
    if(typeof payload === 'string') {
      try {
        var obj = JSON.parse(payload);
        if(obj !== null && typeof obj === 'object') {
          payload = obj;
        }
      } catch (e) { }
    }
  
    //return header if `complete` option is enabled.  header includes claims
    //such as `kid` and `alg` used to select the key within a JWKS needed to
    //verify the signature
    if (options.complete === true) {
      return {
        header: decoded.header,
        payload: payload,
        signature: decoded.signature
      };
    }
    return payload;
  };

module.exports = {
    encodeToken,
    decodeToken,
    decodePayload
};