import { Router } from 'express'

export abstract class IController {
  protected router = Router()

  abstract configure(): Router
}
