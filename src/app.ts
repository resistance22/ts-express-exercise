import express, { Application } from 'express'
import { black } from 'chalk'
import config from './config'
import logger from './logger'
import { ReqLoggerMiddleWare, ErrorHandlerMiddleWare } from './middlewares'
import { applyMiddleware } from './utils'
import DB from './DB'

const app: Application = express()
const port = config.port as number
const host = config.host as string
const db = DB.getInstance()
// Reuquest Logger
applyMiddleware(app, new ReqLoggerMiddleWare())
// json body parser
app.use(express.json())
// urlencoded
app.use(express.urlencoded())
// Error Handleer
app.use(ErrorHandlerMiddleWare)

app.listen(port, host, () => {
  logger.info(`Server is Running on Port: [${black.bgGreen(port)}] and Host: [${black.bgYellow('http://' + host)}]`)
  db.setUp()
})

export default app
