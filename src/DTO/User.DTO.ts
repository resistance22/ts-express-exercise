import * as yup from 'yup'

const UserDTO = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  mobileNumber: yup
    .string()
    .required()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid Mobile Number'),
  password: yup.string().required().min(8)
})

export default UserDTO
