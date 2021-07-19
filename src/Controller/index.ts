import RegisterController from './Register.controller'
import GlobalRouter from './GlobalRouter'

const registerController = new RegisterController()

GlobalRouter.addRoute('/register', registerController)

export default GlobalRouter
