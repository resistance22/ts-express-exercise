import express, { Application, Request, Response } from 'express'
import { black } from 'chalk'
import config from './config'
import logger from './logger'
import { ReqLoggerMiddleWare, ErrorHandlerMiddleWare } from './middlewares'

const app: Application = express()

const port = config.port as number
const host = config.host as string
const reqLoggerMiddleWare = new ReqLoggerMiddleWare()
app.use(reqLoggerMiddleWare.middleware) 

// Error Handling
app.use(ErrorHandlerMiddleWare)
app.listen(port, host, () => {
  logger.info(`Server is Running on Port: [${black.bgGreen(port)}] and Host: [${black.bgYellow('http://' + host)}]`)
})
