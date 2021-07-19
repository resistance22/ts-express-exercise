import { IController } from './interfaces'
import { UserDTO } from '../DTO'
import { ReqBodyValidatorMiddleWare } from '../middlewares'
import { createUser } from '../DBServices/User.service'
import { omit } from '../utils'

class RegisterController extends IController {
  configure = () => {
    const ReqValidator = new ReqBodyValidatorMiddleWare(UserDTO)
    this.router.post('/', ReqValidator.middleware, async (req, res) => {
      const { body } = req
      const insertedUser = await createUser(body)
      const sanitizedVersion = omit(insertedUser.toObject(), '__v', 'password')
      res.json(sanitizedVersion)
    })
    return this.router
  }
}

export default RegisterController
