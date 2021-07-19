import RegisterController from './Register.controller'
import GlobalRouter from './GlobalRouter'

const registerRouter = new RegisterController()

GlobalRouter.addRoute('/register', registerRouter)

export default GlobalRouter
