import express, {Application, Request, Response} from 'express'
const app = express()

app.get('/' ,(req: Request, res: Response): void => {
  res.send('hello')
})

app.listen(5000, () => {
  console.log('server running')
})