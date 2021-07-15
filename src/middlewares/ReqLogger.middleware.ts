import Logger from '../logger'
import { Response, Request, NextFunction } from 'express'
import { yellow, green, black } from 'chalk'
import { Middleware } from './interfaces'

class ReqLoggerMiddleWare implements Middleware{  
  middleware(req: Request, res: Response, next: NextFunction): void {
    Logger.info(`[${green(req.method)}] Request from IP:[${yellow(req.socket.remoteAddress)}] for Endpoint:[${black.bgGreen(req.url)}]`)
    return next()
  }
} 

export default ReqLoggerMiddleWare
