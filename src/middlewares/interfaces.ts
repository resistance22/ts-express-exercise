import {Request, Response, NextFunction, Errback} from 'express'

export interface Middleware {
  middleware(req: Request, res: Response, next: NextFunction): void
}

export interface ErrorMiddleware {
  middleware(err: Errback,req: Request, res: Response, next: NextFunction): void
}