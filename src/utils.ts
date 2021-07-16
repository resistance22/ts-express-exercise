import { Application } from 'express'
import { Middleware } from './middlewares/interfaces'

export const applyMiddleware = (app: Application, Middleware: Middleware): void => {
  app.use(Middleware.middleware)
}
