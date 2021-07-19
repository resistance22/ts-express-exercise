import { expect } from 'chai'
import { UserModel } from '../../src/Models'
import Sinon, { assert, SinonStub } from 'sinon'
import app from '../../src/app'
import chai from 'chai'
import { deleteAllCollectionsData } from '../TestUtils'
import * as servicesObject from '../../src/DBServices/User.service'

describe('POST /register', function () {
  let stub: SinonStub
  let agent = chai.request

  before('Create Stub', async function () {
    const fakeUser = new UserModel({
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+989301112524',
      password: 'abcdefghijkl',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    stub = Sinon.stub(servicesObject, 'createUser').resolves(fakeUser)
  })

  after('restore the stub', async function () {
    stub.restore()
  })

  afterEach('Should clear database', async function () {
    await deleteAllCollectionsData()
  })

  it('Should not work when data in malformed', function (done) {
    agent(app)
      .post('/register')
      .send({})
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should detect wrong email format', function (done) {
    const data = {
      password: '12345678',
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin23',
      mobileNumber: '+989301112524'
    }
    agent(app)
      .post('/register')
      .send(data)
      .end(function (err, res) {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should detect wrong email mobileNumber', function (done) {
    const data = {
      password: '12345678',
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin23@gmail.com',
      mobileNumber: '09301112524'
    }
    agent(app)
      .post('/register')
      .send(data)
      .end(function (err, res) {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should detect wrong password shorter than 8 charachters', function (done) {
    const data = {
      password: '1234567',
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin23@gmail.com',
      mobileNumber: '+989301112524'
    }
    agent(app)
      .post('/register')
      .send(data)
      .end(function (err, res) {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })

  it('Should return the right object when the data is ok', function (done) {
    const userToInsert = {
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+989301112524',
      password: '12345678'
    }
    agent(app)
      .post('/register')
      .send(userToInsert)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('createdAt')
        expect(res.body).to.have.property('updatedAt')
        expect(res.body).to.not.have.property('password')
        expect(res.body).to.not.have.property('__v')
        expect(res.body.firstName).to.be.equal('Amin')
        expect(res.body.lastName).to.be.equal('Foroutan')
        expect(res.body.email).to.be.equal('amin@gmail.com')
        expect(res.body.mobileNumber).to.be.equal('+989301112524')
        Sinon.assert.calledWith(stub, userToInsert)
        Sinon.assert.calledOnce(stub)
        done()
      })
  })
})
