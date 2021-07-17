import { expect } from 'chai'
import { UserModel } from '../../Models'
import Sinon, { SinonStub } from 'sinon'
import app from '../../app'
import chai from 'chai'
import { dbConnect, dropDB } from '../TestUtils'

describe('POST /register', function () {
  let stub: SinonStub

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
    chai
      .request(app)
      .post('/register')
      .send({})
      .then((res) => {
        console.log(res)
        expect(res).to.have.status(422)
      })
  })
})
