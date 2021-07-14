import express, { Application, Request, Response } from 'express'
import { black } from 'chalk'
import config from './config'
const app = express()

const port = config.port as number
const host = config.host as string

app.get('/', (req: Request, res: Response): void => {
  res.send('hello')
})

app.listen(port, host, () => {
  console.log(`Server is Running on Port: [${black.bgGreen(port)}] and Host: [${black.bgYellow('http://' + host)}]`)
})
