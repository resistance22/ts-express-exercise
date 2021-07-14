import express, { Application, Request, Response } from 'express'
import { black } from 'chalk'
import config from './config'
import logger, { ReqLoggerMiddleWare } from './logger'
const app: Application = express()

const port = config.port as number
const host = config.host as string
app.use(ReqLoggerMiddleWare)
app.get('/', (req: Request, res: Response): void => {
  res.send('hello')
})

app.listen(port, host, () => {
  logger.info(`Server is Running on Port: [${black.bgGreen(port)}] and Host: [${black.bgYellow('http://' + host)}]`)
})
