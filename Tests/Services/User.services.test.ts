import { expect } from 'chai'
import { createUser, findUserByEmailOrMobile, authorizeUser, setRefreshToken } from '../../src/DBServices/User.service'
import { UserModel } from '../../src/Models'
import config from '../../src/config'
import jwt from 'jsonwebtoken'
import { RedisClient } from '../../src/DB/'

// createUser()
describe('createUser()', function () {
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

  it('should hash the password', async function () {
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
    expect(user.password).to.not.be.equal('12345678')
  })
})

// findUserByEmailOrMobile()
describe('findUserByEmailOrMobile()', async function () {
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

// authorizeUser()
describe('authorizeUser()', async function () {
  beforeEach('add some users to database', function () {
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
        password: '123456789'
      }
    ]
    return UserModel.create(usersToInsert)
  })

  it('should throw an error with wrong email', async function () {
    const userToAuthorize = {
      crudential: 'amin3@gmail.com',
      password: '12345678'
    }
    await expect(authorizeUser(userToAuthorize)).to.be.rejected
  })

  it('should throw an error with wrong phoneNumber', async function () {
    const userToAuthorize = {
      crudential: '+989301112527',
      password: '12345678'
    }
    await expect(authorizeUser(userToAuthorize)).to.be.rejected
  })

  it('should throw an error with wrong password', async function () {
    const userToAuthorize = {
      crudential: '+989301112524',
      password: '123456789'
    }
    await expect(authorizeUser(userToAuthorize)).to.be.rejected
  })

  it('should generate the right token with the right crudentials', async function () {
    const userToAuthorize = {
      crudential: 'amin2@gmail.com',
      password: '123456789'
    }
    const token = await authorizeUser(userToAuthorize)
    expect(token).to.have.property('accessToken')
    const decoded = jwt.verify(token.accessToken, config.tokenSecret as string) as any
    expect(decoded.firstName).to.be.equal('Amin')
    expect(decoded.lastName).to.be.equal('Foroutan')
    expect(decoded.mobileNumber).to.be.equal('+989301112526')
    expect(decoded.email).to.be.equal('amin2@gmail.com')
  })
})

// setRefreshToken()
describe('setRefreshToken()', async function () {
  it('should enter the refresh token to the redis database.', async function () {
    await setRefreshToken('aminf@gmail.com', 'jfldsjflkdaflkdsjdlfsfjdslfkjslkfjds')
    const token = await RedisClient.get('aminf@gmail.com')
    expect(token).to.be.equal('jfldsjflkdaflkdsjdlfsfjdslfkjslkfjds')
  })
})
