import { Request, Response, Errback, NextFunction } from 'express'
import Logger from '../logger'
import HTTPError from '../Errors/HTTPError'

interface CustomError extends Errback {
  message: string
  status: number
}

const ErrorHandlerMiddleWare = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  Logger.error(err)
  if (err instanceof HTTPError) {
    return res.status(err.status).json(err.message)
  }
  return res.status(500).json('something went wrong!')
}

export default ErrorHandlerMiddleWare
