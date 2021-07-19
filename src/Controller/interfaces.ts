import express, { Router } from 'express'

export abstract class IController {
  protected router: Router
  constructor(protected endpoint: string) {
    this.router = express.Router()
  }
  abstract configure(): Router
}
