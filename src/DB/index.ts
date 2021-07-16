import config from '../config'
import mongoose, { Connection } from 'mongoose'
import Logger from '../logger'

class DB {
  private db: Connection = mongoose.connection
  private static instance: DB | null = null
  private constructor() {}

  static getInstance(): DB {
    if (this.instance instanceof DB) {
      return this.instance
    }
    this.instance = new DB()
    return this.instance
  }
  setUp() {
    mongoose.connect(config.dbURI as string, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      err && Logger.error(err)
    })
    this.db.once('open', () => {
      // we're connected!
      Logger.info('Connected succussfully to Database.')
    })
  }
}

export default DB
