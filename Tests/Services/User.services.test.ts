import { expect } from 'chai'
import { createUser, findUserByEmailOrMobile } from '../../src/DBServices/User.service'
import { deleteAllCollectionsData } from '../TestUtils'
import { UserModel } from '../../src/Models'

describe('createUser', function () {
  afterEach('should clear database', async function () {
    await deleteAllCollectionsData()
  })
  it('Should insert a new User to the database', async function () {
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

  it('Should throw an error when there is a duplicate email', async function () {
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

  it('Should throw an error when there is a duplicate mobileNumber', async function () {
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

describe('findUserByEmailOrMobile', async function () {
  before('add some users to database', async function () {
    const usersToInsert = [
      {
        firstName: 'Amin',
        lastName: 'Foroutan',
        email: 'amin@gmail.com',
        mobileNumber: '+989301112524',
        password: '12345678'
      },
      {
        firstName: 'Amin',
        lastName: 'Foroutan',
        email: 'amin1@gmail.com',
        mobileNumber: '+989301112525',
        password: '12345678'
      },
      {
        firstName: 'Amin',
        lastName: 'Foroutan',
        email: 'amin2@gmail.com',
        mobileNumber: '+989301112526',
        password: '12345678'
      }
    ]
    await UserModel.insertMany(usersToInsert)
  })

  it('should return the right user when given the user email', async function () {
    const user = await findUserByEmailOrMobile('amin@gmail.com')
    if (user !== null) {
      expect(user).to.have.property('_id')
      expect(user).to.have.property('createdAt')
      expect(user).to.have.property('updatedAt')
      expect(user.firstName).to.be.equal('Amin')
      expect(user.lastName).to.be.equal('Foroutan')
      expect(user.email).to.be.equal('amin@gmail.com')
      expect(user.mobileNumber).to.be.equal('+989301112524')
    }
  })

  it('should return the right user when given the user Mobile Number', async function () {
    const user = await findUserByEmailOrMobile('+989301112526')
    if (user !== null) {
      expect(user).to.have.property('_id')
      expect(user).to.have.property('createdAt')
      expect(user).to.have.property('updatedAt')
      expect(user.firstName).to.be.equal('Amin')
      expect(user.lastName).to.be.equal('Foroutan')
      expect(user.email).to.be.equal('amin2@gmail.com')
      expect(user.mobileNumber).to.be.equal('+989301112526')
    }
  })

  it('should return the null with wrong crudentials', async function () {
    const user = await findUserByEmailOrMobile('+989301112528')
    expect(user).to.be.null
  })
})
