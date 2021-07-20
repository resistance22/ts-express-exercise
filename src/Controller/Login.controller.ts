import { IController } from './interfaces'
import { LoginDTO } from '../DTO'
import { ReqBodyValidatorMiddleWare } from '../middlewares'
import { authorizeUser } from '../DBServices/User.service'
import { omit } from '../utils'

class LoginController extends IController {
  configure = () => {
    const ReqValidator = new ReqBodyValidatorMiddleWare(LoginDTO)
    this.router.post('/', ReqValidator.middleware, async (req, res) => {
      const { body } = req
      const result = await authorizeUser(body)
      res.json(result)
    })
    return this.router
  }
}

export default LoginController
