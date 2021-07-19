import Logger from '../logger'
import { Response, Request, NextFunction } from 'express'
import { Middleware } from './interfaces'
import { ObjectSchema } from 'joi'
import { HttpError } from '../Errors'

class ReqBodyValidatorMiddleWare implements Middleware {
  constructor(private Schema: ObjectSchema<any>) {}

  middleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    try {
      await this.Schema.validateAsync(body, { abortEarly: false })
      return next()
    } catch (error) {
      return next(new HttpError(422, error.details))
    }
  }
}

export default ReqBodyValidatorMiddleWare
