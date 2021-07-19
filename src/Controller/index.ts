import { Router } from 'express'
import RegisterController from './Register.controller'

const globalRouter = Router()
const registerRouter = new RegisterController().configure()

globalRouter.use('/', registerRouter)

export default globalRouter
