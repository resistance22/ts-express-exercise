import { Controller } from './interfaces'
import { UserDTO } from '../DTO'
import { ReqBodyValidatorMiddleWare } from '../middlewares'

class RegisterController extends Controller {
  constructor() {
    super('/register')
  }
  configure = () => {
    const ReqValidator = new ReqBodyValidatorMiddleWare(UserDTO)
    this.Router.post(this.endpoint, ReqValidator.middleware, (req, res) => {
      const { body } = req
      res.json(body)
    })
    return this.Router
  }
}

export default RegisterController
