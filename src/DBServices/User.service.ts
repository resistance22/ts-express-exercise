import { UserModel } from '../Models'
import { HttpError } from '../Errors'
import Logger from '../logger'

export interface UserObject {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  password: string
}

export async function createUser(userObject: UserObject) {
  try {
    const savedUser = await UserModel.create(userObject)
    return {
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      mobileNumber: savedUser.mobileNumber
    }
  } catch (e) {
    if (e.code === 11000) {
      throw new HttpError(409, ['duplicate value found in you data!'])
    } else {
      throw new Error('Database Error accured!')
    }
  }
}