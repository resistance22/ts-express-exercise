import { IController } from './interfaces'
import { TokenDTO } from '../DTO'
import { ReqBodyValidatorMiddleWare } from '../middlewares'

class TokenController extends IController {
  configure = () => {
    const ReqValidator = new ReqBodyValidatorMiddleWare(TokenDTO)
    this.router.post('/', ReqValidator.middleware, async (req, res) => {})
    return this.router
  }
}

export default TokenController
