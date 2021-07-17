import { expect } from 'chai'
import { createUser } from '../../DBServices/User.service'
import { UserModel } from '../../Models'
import { after } from 'mocha'
import { dbConnect, deleteAllData, syncAllIndexes, dropDB } from '../TestUtils'

describe('createUser', function () {
  afterEach('sync indexes', async () => {
    await deleteAllData(UserModel)
    await syncAllIndexes(UserModel)
  })

  it('Should insert a new User to the database', async () => {
    const userToInsert = {
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+989301112524',
      password: '12345678'
    }
    const user = await createUser(userToInsert)

    expect(user).to.have.property('_id')
    expect(user).to.have.property('createdAt')
    expect(user).to.have.property('updatedAt')
    expect(user.firstName).to.be.equal('Amin')
    expect(user.lastName).to.be.equal('Foroutan')
    expect(user.email).to.be.equal('amin@gmail.com')
    expect(user.mobileNumber).to.be.equal('+989301112524')
  })

  it('Should throw an error when there is a duplicate email', async () => {
    const userToInsert = {
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+989301112524',
      password: '12345678'
    }
    const duplicateEmail = {
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+989301112525',
      password: '12345678'
    }
    await createUser(userToInsert)
    await expect(createUser(duplicateEmail)).to.be.rejected
  })

  it('Should throw an error when there is a duplicate mobileNumber', async () => {
    const userToInsert = {
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin@gmail.com',
      mobileNumber: '+989301112524',
      password: '12345678'
    }
    const duplicateEmail = {
      firstName: 'Amin',
      lastName: 'Foroutan',
      email: 'amin1@gmail.com',
      mobileNumber: '+989301112524',
      password: '12345678'
    }
    await createUser(userToInsert)
    await expect(createUser(duplicateEmail)).to.be.rejected
  })
})
