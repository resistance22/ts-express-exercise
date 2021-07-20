import { expect } from 'chai'
import config from '../../src/config'
import Sinon, { assert, fake, SinonStub } from 'sinon'
import app from '../../src/app'
import chai from 'chai'
import jwt from 'jsonwebtoken'
import * as servicesObject from '../../src/DBServices/User.service'

// POST /login
describe('POST /login', function () {
  let stub: SinonStub
  let agent = chai.request

  before('Create Stub', async function () {
    const user = {
      firstName: 'Amin',
      lastName: 'Foroutan',
      mobileNumber: '+989301112524',
      email: 'amin@gmail.com'
    }
    const fakeToken = jwt.sign(user, config.tokenSecret as string)
    const fakeResult = {
      accessToken: fakeToken
    }
    stub = Sinon.stub(servicesObject, 'authorizeUser').resolves(fakeResult)
  })

  after('restore the stub', async function () {
    stub.restore()
  })

  it('Should detect when crudential is missing', function (done) {
    agent(app)
      .post('/login')
      .send({
        password: '12345678'
      })
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should detect when password is missing', function (done) {
    agent(app)
      .post('/login')
      .send({
        crudential: 'amin@gmail.com'
      })
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should detect malformed email', function (done) {
    agent(app)
      .post('/login')
      .send({
        crudential: 'amingmail.com',
        password: 'amoidsfs'
      })
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should detect malformed phoneNumber', function (done) {
    agent(app)
      .post('/login')
      .send({
        crudential: '94384898',
        password: 'amoidsfs'
      })
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should return right token when provided right crudentials', function (done) {
    const body = {
      crudential: 'amin@gmail.com',
      password: '12345678'
    }
    agent(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('accessToken')
          const decoded = jwt.verify(res.body.accessToken, config.tokenSecret as string) as any
          expect(decoded.firstName).to.be.equal('Amin')
          expect(decoded.lastName).to.be.equal('Foroutan')
          expect(decoded.mobileNumber).to.be.equal('+989301112524')
          expect(decoded.email).to.be.equal('amin@gmail.com')
          done()
        }
      })
  })
})
