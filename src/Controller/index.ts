import GlobalRouter from './GlobalRouter'
import RegisterController from './Register.controller'
import LoginController from './Login.controller'
import TokenController from './Token.controller'

const registerController = new RegisterController()
const loginController = new LoginController()
const tokenController = new TokenController()

GlobalRouter.addRoute('/register', registerController)
GlobalRouter.addRoute('/login', loginController)
GlobalRouter.addRoute('/token', tokenController)

export default GlobalRouter
