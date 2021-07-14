export default class HTTPError extends Error {
  constructor(public status: number, public message: string) {
    super(message)
    this.name = 'HTTPError'
    this.status = status
  }
}
