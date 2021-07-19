import RegisterController from './Register.controller'
import GlobalRouter from './GlobalRouter'

const registerRouter = new RegisterController()

GlobalRouter.addRoute(registerRouter)

export default GlobalRouter
