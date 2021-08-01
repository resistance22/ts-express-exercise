import Joi from 'joi'

const UserDTO = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  mobileNumber: Joi.string()
    .required()
    .pattern(/^(\+98|0)9\d{9}$/)
    .messages({
      'string.pattern.base': 'Invalid Mobile Number!'
    }),
  password: Joi.string().required().min(8)
})

export default UserDTO
