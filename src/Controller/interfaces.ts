import express, { Router } from 'express'
export abstract class Controller {
  protected Router: Router
  constructor(protected endpoint: string) {
    this.Router = express.Router()
  }
  abstract configure(): Router
}
