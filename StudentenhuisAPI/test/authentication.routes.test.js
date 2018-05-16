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
            firstname: ' FirstName ',
            lastname: ' LastName ',
            email: 'tst@test.com',
            password: 'secret'
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
              .get('/api/registratie')
              .end(function(err, res){
                res.should.have.status(404);
                done();
              });
            });
          

    it('should throw an error when the user already exists', (done) => {
        chai.request(server).post('/api/register').send({
            firstname: 'Jan',
            lastname: "Smit",
            email: "jsmit@server.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
        
            done();
        });
    })

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server).post('/api/register').send({
            lastname: "Karel",
            email: "test@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
                firstname: 'a',
                lastname: "Karel",
                email: "test@test.nl",
                password: "secret"
            }).end((err, res) => {
                res.should.have.status(412);
    
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code');
                res.body.should.have.property('datetime');
           
                done();
            });
    })

    it('should throw an error when no lastname is provided', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
                firstname: 'a',
                email: "test@test.nl",
                password: "secret"
            }).end((err, res) => {
                res.should.have.status(412);
    
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code');
                res.body.should.have.property('datetime');
           
                done();
            })
        
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
                firstname: 'asdfa',
                lastname: "a",
                email: "test@test.nl",
                password: "secret"
            }).end((err, res) => {
                res.should.have.status(412);
    
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code');
                res.body.should.have.property('datetime');
           
                done();
            })
        
        
    })

    it('should throw an error when email is invalid', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
                firstname: 'asdfa',
                lastname: "lkjkjldsf",
                email: "jajaja",
                password: "secret"
            }).end((err, res) => {
                res.should.have.status(412);
    
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code');
                res.body.should.have.property('datetime');
           
                done();
    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
        .post('/api/login')
        .send({
            email: 'tst@test.com',
            password: 'secret'
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
        chai.request(server)
        .post('/api/register')
        .send({
                email: "a",
                password: "secret"
            }).end((err, res) => {
                res.should.have.status(412);
    
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code');
                res.body.should.have.property('datetime');
           
                done();
    })
})

    it('should throw an error when email exists but password is invalid', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
                email: "test@test.nl",
                password: "a"
            }).end((err, res) => {
                res.should.have.status(412);
    
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code');
                res.body.should.have.property('datetime');
           
                done();
    })
})
    it('should throw an error when using an invalid email', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
                email: "a",
                password: "secret"
            }).end((err, res) => {
                res.should.have.status(412);
    
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code');
                res.body.should.have.property('datetime');
           
                done();
    })
})
    
    })
})

    
})