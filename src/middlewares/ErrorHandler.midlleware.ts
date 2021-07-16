import { Request, Response, Errback, NextFunction } from 'express'
import Logger from '../logger'
import { CustomError } from '../Errors/interfaces'

const ErrorHandlerMiddleWare = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  Logger.error(err)
  if (err.name === 'HTTPError') {
    return res.status(err.status).json(err.messages)
  }
  return res.status(500).json('something went wrong!')
}

export default ErrorHandlerMiddleWare
