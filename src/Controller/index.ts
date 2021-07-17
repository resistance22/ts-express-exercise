import { Router } from 'express'
import RegisterController from './Register.controller'

const registerRouter = new RegisterController().configure()

const globalRouter = Router()

globalRouter.use('/', registerRouter)

export default globalRouter
