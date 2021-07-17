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

export const deleteAllMolelData = async (model: Model<any>) => {
  await model.deleteMany({})
}

export const syncAllModelIndexes = async (model: Model<any>) => {
  await model.syncIndexes()
}

export const dropDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await Server.stop()
}

export const deleteAllCollectionsData = async () => {
  try {
    Object.keys(mongoose.models).forEach(async (key) => {
      await mongoose.models[key].deleteMany({})
      await mongoose.models[key].syncIndexes()
    })
  } catch (e) {
    console.log(e)
  }
}
