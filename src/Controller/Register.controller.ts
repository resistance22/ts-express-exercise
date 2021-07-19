import { Controller } from './interfaces'
import { UserDTO } from '../DTO'
import { ReqBodyValidatorMiddleWare } from '../middlewares'
import { createUser } from '../DBServices/User.service'
import { omit } from '../utils'

class RegisterController extends Controller {
  constructor() {
    super('/register')
  }
  configure = () => {
    const ReqValidator = new ReqBodyValidatorMiddleWare(UserDTO)
    this.Router.post(this.endpoint, ReqValidator.middleware, async (req, res) => {
      const { body } = req
      const insertedUser = await createUser(body)
      const sanitizedVersion = omit(insertedUser.toObject(), '__v', 'password')
      res.json(sanitizedVersion)
    })
    return this.Router
  }
}

export default RegisterController
