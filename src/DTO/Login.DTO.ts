import Joi from 'joi'

const LoginDTO = Joi.object({
  crudential: Joi.alternatives()
    .try(
      Joi.string()
        .pattern(/^(\+98|0)9\d{9}$/)
        .messages({
          'string.pattern.base': 'Invalid Mobile Number!'
        }),
      Joi.string().email()
    )
    .required()
    .messages({
      'alternatives.match': 'Crudential must be a valid email or mobile number!'
    }),
  password: Joi.string().required().min(8)
})

export default LoginDTO
