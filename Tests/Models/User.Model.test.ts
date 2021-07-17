import { expect } from 'chai'
import { createUser } from '../../src/DBServices/User.service'

describe('createUser', function () {
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
