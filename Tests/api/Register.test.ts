import { expect } from 'chai'
import { UserModel } from '../../src/Models'
import Sinon, { SinonStub } from 'sinon'
import app from '../../src/app'
import chai from 'chai'
import { deleteAllCollectionsData } from '../TestUtils'
describe('POST /register', function () {
  afterEach('should clear database', async function () {
    await deleteAllCollectionsData()
  })
  let stub: SinonStub
  let agent = chai.request

  before('Create Stub', async () => {
    const fakeUser = {
      _id: 'fadsfdsafd23321',
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+0989301112524',
      createdAt: '2021-07-17T07:45:00.823Z',
      updatedAt: '2021-07-17T07:45:00.823Z'
    }
    stub = Sinon.stub(UserModel, 'create').resolves(fakeUser)
  })

  after('restore the stub', async () => {
    stub.restore()
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
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('createdAt')
          expect(res.body).to.have.property('updatedAt')
          expect(res.body.firstName).to.be.equal('Amin')
          expect(res.body.lastName).to.be.equal('Foroutan')
          expect(res.body.email).to.be.equal('amin@gmail.com')
          expect(res.body.mobileNumber).to.be.equal('+989301112524')
        }
      })
  })
})
