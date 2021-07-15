import config from '../config'
import mongoose, { Connection } from 'mongoose'
import Logger from '../logger'

class DB {
  private db: Connection = mongoose.connection
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
