import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let Server: MongoMemoryServer

export const dbConnect = async () => {
  Server = await MongoMemoryServer.create()
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
  const uri = Server.getUri()
  if (mongoose.connection.db) return
  await mongoose.connect(uri, mongooseOpts)
}

export const deleteAllData = async (model: Model<any>) => {
  await model.deleteMany({})
}

export const syncAllIndexes = async (model: Model<any>) => {
  await model.syncIndexes()
}

export const dropDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await Server.stop()
}
