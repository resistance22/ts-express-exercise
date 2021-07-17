import { Controller } from './interfaces'
import { UserDTO } from '../DTO'
import { ReqBodyValidatorMiddleWare } from '../middlewares'
import { createUser } from '../DBServices/User.service'
class RegisterController extends Controller {
  constructor() {
    super('/register')
  }
  configure = () => {
    const ReqValidator = new ReqBodyValidatorMiddleWare(UserDTO)
    this.Router.post(this.endpoint, ReqValidator.middleware, async (req, res) => {
      const { body } = req
      const insertedUser = await createUser(body)
      res.json(insertedUser)
    })
    return this.Router
  }
}

export default RegisterController
