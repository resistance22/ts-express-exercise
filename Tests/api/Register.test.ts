import { expect } from 'chai'
import { UserModel } from '../../src/Models'
import Sinon, { SinonStub } from 'sinon'
import app from '../../src/app'
import chai from 'chai'

describe('POST /register', function () {
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

  it('Should should not work when data in malformed', () => {
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

  it('Should detect wrong email format', () => {
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
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
        }
      })
  })

  it('Should detect wrong email mobileNumber', () => {
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
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
        }
      })
  })

  it('Should detect wrong password shorter than 8 charachters', () => {
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
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
        }
      })
  })
})
