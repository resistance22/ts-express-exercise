import { IController } from './interfaces'
import { LoginDTO } from '../DTO'
import { ReqBodyValidatorMiddleWare } from '../middlewares'
import { authorizeUser } from '../DBServices/User.service'
import { omit } from '../utils'

class LoginController extends IController {
  configure = () => {
    const ReqValidator = new ReqBodyValidatorMiddleWare(LoginDTO)
    this.router.post('/', ReqValidator.middleware, async (req, res, next) => {
      const { body } = req
      try {
        const result = await authorizeUser(body)
        res.json(result)
      } catch (e) {
        next(e)
      }
    })
    return this.router
  }
}

export default LoginController
