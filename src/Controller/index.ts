import GlobalRouter from './GlobalRouter'
import RegisterController from './Register.controller'
import LoginController from './Login.controller'
import TokenController from './Token.controller'

const registerController = new RegisterController()
const loginController = new LoginController()
const tokenController = new TokenController()

GlobalRouter.addRoute('/api/register', registerController)
GlobalRouter.addRoute('/api/login', loginController)
GlobalRouter.addRoute('/api/token', tokenController)

export default GlobalRouter
