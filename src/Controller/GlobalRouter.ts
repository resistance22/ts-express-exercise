import { Router } from 'express'
import { IController } from './interfaces'

class GlobalRouter {
  private static router = Router()
  private constructor() {}

  static getRouter() {
    return this.router
  }

  static addRoute(Controller: IController) {
    const newRoute = Controller.configure()
    this.router.use('/', newRoute)
  }
}

export default GlobalRouter
