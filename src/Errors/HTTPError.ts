export default class HTTPError extends Error {
  constructor(public message: string, public status: number) {
    super(message)
    this.name = 'HTTPError'
    this.status = status
  }
}
