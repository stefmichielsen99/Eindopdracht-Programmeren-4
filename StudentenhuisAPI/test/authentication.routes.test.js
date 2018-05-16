/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

chai.should()
chai.use(chaiHttp)

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
        .post('/api/register')
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

            // Export the aquired token for other testcases.
            validToken = res.body.token;
            module.exports = {
                token: validToken
            };
            done();
        });

    it('should return an error on GET request', (done) => {
            chai.request(server)
              .get('/blobs')
              .end(function(err, res){
                res.should.have.status(404);
                done();
              });
            });
          

    it('should throw an error when the user already exists', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when no firstname is provided', (done) => {
        const token = require(validToken)
        chai.request(server)
            .post('/api/register')
            .set('x-access-token', token)
            .send({
                'Achternaam': '  LastName   ',
                'Email': ' user@host.com ',
                'Password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
    })

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        const token = require(validToken)
        chai.request(server)
            .post('/api/register')
            .set('x-access-token', token)
            .send({
                'Voornaam': '  bo   ',
                'Achternaam': 'achternaam',
                'Email': ' user@host.com ',
                'Password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(422)
                //Res.body.should.be(groter dan 2 vgm)
                res.body.should.be.above(2)

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
        done()
    })

    it('should throw an error when no lastname is provided', (done) => {
        const token = require(validToken)
        chai.request(server)
            .post('/api/register')
            .set('x-access-token', token)
            .send({
                'Voornaam': '  voornaam   ',
                'Email': ' user@host.com ',
                'Password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
        
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        const token = require(validToken)
        chai.request(server)
            .post('/api/register')
            .set('x-access-token', token)
            .send({
                'Voornaam': '  voornaam   ',
                'Achternaam': 'op',
                'Email': ' user@host.com ',
                'Password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(422)
                //Res.body.should.be(groter dan 2 vgm)
                res.body.should.be.above(2)

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
        
        
    })

    it('should throw an error when email is invalid', (done) => {

    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
        .post('/api/login')
        .send({
            'Email': 'tst@test.com',
            'Password': 'secret'
        })
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            const response = res.body
            response.should.have.property('token').which.is.a('string')
            response.should.have.property('email').which.is.a('string')
            done()
        });
    }); 

    it('should throw an error when email does not exist', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when email exists but password is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when using an invalid email', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    })

    
})