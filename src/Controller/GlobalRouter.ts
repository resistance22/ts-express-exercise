import { Router } from 'express'
import { IController } from './interfaces'

class GlobalRouter {
  private static router = Router()
  private constructor() {}

  static getRouter() {
    return this.router
  }

  static addRoute(endpoint: string, Controller: IController) {
    const newRoute = Controller.configure()
    this.router.use(endpoint, newRoute)
  }
}

export default GlobalRouter
