import { expect } from 'chai'
import config from '../../src/config'
import Sinon, { assert, fake, SinonStub } from 'sinon'
import app from '../../src/app'
import chai from 'chai'
import jwt from 'jsonwebtoken'
import * as servicesObject from '../../src/DBServices/User.service'

// POST /token
describe('POST /token', function () {
  let agent = chai.request
  it('Should detect when body.token is missing', function (done) {
    agent(app)
      .post('/token')
      .send({})
      .end((err, res) => {
        if (!err) {
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('array')
          done()
        }
      })
  })
})
