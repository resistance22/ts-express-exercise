import Logger from '../logger'
import { Response, Request, NextFunction } from 'express'
import { Middleware } from './interfaces'
import { ObjectSchema } from 'yup'
import { HttpError } from '../Errors'

class ReqBodyValidatorMiddleWare implements Middleware {
  constructor(private Schema: ObjectSchema<any>) {}

  middleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    try {
      await this.Schema.validate(body, { abortEarly: false })
      return next()
    } catch (error) {
      const errors: string[] = []
      for (let i = 0; i < error.inner.length; i++) {
        errors.push(error.inner[i].message)
      }
      return next(new HttpError(422, errors))
    }
  }
}

export default ReqBodyValidatorMiddleWare
