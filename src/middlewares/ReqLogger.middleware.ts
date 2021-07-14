import Logger from '../logger'
import { Response, Request, NextFunction } from 'express'
import { yellow, green, black } from 'chalk'

const ReqLoggerMiddleWare = (req: Request, res: Response, next: NextFunction): void => {
  Logger.info(`[${green(req.method)}] Request from IP:[${yellow(req.socket.remoteAddress)}] for Endpoint:[${black.bgGreen(req.url)}]`)
  return next()
}

export default ReqLoggerMiddleWare
