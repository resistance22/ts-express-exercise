import Joi from 'joi'

const UserDTO = Joi.object({
  token: Joi.string().required()
})

export default UserDTO
