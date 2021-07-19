import RegisterController from './Register.controller'
import LoginController from './Login.controller'
import GlobalRouter from './GlobalRouter'

const registerController = new RegisterController()
const loginController = new LoginController()

GlobalRouter.addRoute('/register', registerController)
GlobalRouter.addRoute('/login', loginController)

export default GlobalRouter
