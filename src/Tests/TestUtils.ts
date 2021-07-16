import mongoose, { Model } from 'mongoose'

export const dbConnect = async () => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
  await mongoose.connect('mongodb://localhost:27017/TEST_DB', mongooseOpts)
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
}
