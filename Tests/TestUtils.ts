import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let Server: MongoMemoryServer

export async function dbConnect() {
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

export async function deleteAllMolelData(model: Model<any>) {
  await model.deleteMany({})
}

export async function syncAllModelIndexes(model: Model<any>) {
  await model.syncIndexes()
}

export async function dropDB() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await Server.stop()
}

export async function deleteAllCollectionsData() {
  Object.keys(mongoose.models).forEach(async function (key) {
    await mongoose.models[key].deleteMany({})
    await mongoose.models[key].syncIndexes()
  })
}
