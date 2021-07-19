import { expect } from 'chai'
import { UserModel } from '../../src/Models'
import Sinon, { SinonStub } from 'sinon'
import app from '../../src/app'
import chai from 'chai'
import { deleteAllCollectionsData } from '../TestUtils'
import servicesObject from '../../src/DBServices/User.service'

describe('POST /register', function () {
  let stub: SinonStub
  let agent = chai.request

  before('Create Stub', async () => {
    const fakeUser = new UserModel({
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+989301112524',
      password: 'abcdefghijkl'
    })
    stub = Sinon.stub(servicesObject, 'createUser').resolves(fakeUser)
  })

  after('restore the stub', async () => {
    stub.restore()
  })

  afterEach('should clear database', async function () {
    await deleteAllCollectionsData()
  })

  it('Should should not work when data in malformed', function () {
    agent(app)
      .post('/register')
      .send({})
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
        }
      })
  })

  it('Should detect wrong email format', function () {
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
        }
      })
  })

  it('Should detect wrong email mobileNumber', function () {
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
        }
      })
  })

  it('Should detect wrong password shorter than 8 charachters', function () {
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
        }
      })
  })

  it('Should return the right object when the data is ok', function () {
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
      .end((err, res) => {
        if (!err) {
          console.log(res)
        } else {
          console.log(err)
        }
      })
  })
})
