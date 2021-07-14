import pino from 'pino'
import dayjs from 'dayjs'
import { Response, Request, NextFunction } from 'express'
import { yellow, green, magenta } from 'chalk'

const Logger = pino({
  prettyPrint: true,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
})

export const ReqLoggerMiddleWare = (req: Request, res: Response, next: NextFunction): void => {
  Logger.info(`[${green(req.method)}] Request from IP:[${yellow(req.socket.remoteAddress)}] for Endpoint:[${magenta(req.url)}]`)
  return next()
}

export default Logger
