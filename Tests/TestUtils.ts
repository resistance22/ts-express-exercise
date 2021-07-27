import mongoose, { Model } from 'mongoose'
import { Done } from 'mocha'
import config from '../src/config'

export async function dbConnect() {
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
  if (mongoose.connection.db) return
  await mongoose.connect(config.dbURI as string, mongooseOpts)
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
}

export function deleteAllCollectionsData(done: Done) {
  Object.keys(mongoose.models).forEach(function (key) {
    mongoose.models[key].deleteMany({}).then(() => {
      mongoose.models[key].syncIndexes().then(() => {
        done()
      })
    })
  })
}
