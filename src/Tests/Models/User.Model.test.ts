import { expect } from 'chai'
import { createUser } from '../../DBServices/User.service'
import { UserModel } from '../../Models'
import { HttpError } from '../../Errors'
import { after } from 'mocha'
import { dbConnect, deleteAllData, syncAllIndexes, dropDB } from '../TestUtils'

describe('createUser', () => {
  before('Open the database connection', async () => {
    await dbConnect()
  })

  afterEach('sync indexes', async () => {
    await deleteAllData(UserModel)
    await syncAllIndexes(UserModel)
  })

  after('Delete Database', async () => {
    await dropDB()
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

    expect(user).excludingEvery('password').to.deep.equal(userToInsert)
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
