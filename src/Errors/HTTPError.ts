import { CustomError } from './interfaces'

class HttpError extends Error implements CustomError {
  constructor(public status: number, public messages: string[]) {
    super('Http Error accured!')
    this.name = 'HTTPError'
    this.status = status
    this.messages = messages
  }
}

export default HttpError
