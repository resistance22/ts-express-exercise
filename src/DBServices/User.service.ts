import { UserModel } from '../Models'
import { HttpError } from '../Errors'
import Logger from '../logger'
import jwt from 'jsonwebtoken'
import config from '../config'
import { omit } from '../utils'

export interface UserObject {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  password: string
}

export const createUser = async (userObject: UserObject) => {
  try {
    const savedUser = await UserModel.create(userObject)
    return savedUser
  } catch (e) {
    Logger.error(e)
    if (e.code === 11000) {
      throw new HttpError(409, ['duplicate value found in you data!'])
    } else {
      throw new Error('Database Error accured!')
    }
  }
}

export const findUserByEmailOrMobile = async (value: string) => {
  const query = { $or: [{ email: value }, { mobileNumber: value }] }
  const result = await UserModel.findOne(query)
  return result
}

export const generateAccessToken = (obj: object) => {
  return jwt.sign(obj, config.tokenSecret as string, { expiresIn: '1h' })
}

export const setRefreshToken = (email: string, token: string) => {}

export const authorizeUser = async (crudentials: { crudential: string; password: string }) => {
  const { crudential, password } = crudentials
  const user = await findUserByEmailOrMobile(crudential)

  if (user === null) {
    throw new HttpError(401, ['wrong crudentials!'])
  }

  const passwordMatch = await user.comparePassword(password)
  if (!passwordMatch) {
    throw new HttpError(401, ['wrong crudential!'])
  }
  const userObj = user.toObject()

  return {
    accessToken: generateAccessToken(omit(userObj, 'password', '__v'))
  }
}
