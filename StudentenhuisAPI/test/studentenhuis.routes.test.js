const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
// Token dat je nodig hebt voor de testen
const token = require('../test/authentication.routes.test')

chai.should()
chai.use(chaiHttp)

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
        .post('/api/studentenhuis   ')
        .send({
            Naam: 'Omega',
            Adres: 'teststraat 1',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(401);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        chai.request(server)
        .post('/api/studentenhuis   ')
        .send({
            Naam: 'Omega',
            Adres: 'Teststraat 1',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
        .post('/api/studentenhuis   ')
        .send({
            Adres: 'Teststraat 1',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
        .post('/api/studentenhuis   ')
        .send({
            Naam: 'Omega',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })
})

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
        .get('/api/studentenhuis')
        .send({
            Naam: 'Omega',
            Adres: 'Teststraat 1',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(401);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(server)
        .get('/api/studentenhuis')
        .send({
            Naam: 'Omega',
            Adres: 'Teststraat',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })
})

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
        .get('/api/studentenhuis')
        .send({
            ID: '1',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(401);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(server)
        .get('/api/studentenhuis')
        .send({
            ID: '1',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should return an error when using an non-existing huisId', (done) => {
        chai.request(server)
        .get('/api/studentenhuis   ')
        .send({
            ID: '1',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })
})

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
        .put('/api/studentenhuis   ')
        .send({
            ID: '1',
            Naam: 'Alpha',
            Adres: 'Testadres 2',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(401);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        chai.request(server)
        .put('/api/studentenhuis   ')
        .send({
            ID: '1',
            Naam: 'Alpha',
            Adres: 'Testadres 2',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
        .put('/api/studentenhuis')
        .send({
            ID: '1',
            Adres: 'Testadres 2',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
        .post('/api/studentenhuis   ')
        .send({
            ID: '1',
            Naam: 'Alpha',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
        .del('/api/studentenhuis   ')
        .send({
            ID: '1',
            Naam: 'Alpha',
            Adres: 'Testadres 2',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(401);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        chai.request(server)
        .del('/api/studentenhuis')
        .send({
            ID: '1',
            Naam: 'Alpha',
            Adres: 'Testadres 2',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    })

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
        .del('/api/studentenhuis   ')
        .send({
            ID: '1',
            Adres: 'Testadres 2',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
        
    })

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
        .del('/api/studentenhuis   ')
        .send({
            ID: '1',
            Naam: 'Alpha',
            UserID = 'token'
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
        
    })
})