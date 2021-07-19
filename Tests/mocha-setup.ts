import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiAsPromised from 'chai-as-promised'
import chaiHttp from 'chai-http'
import { dbConnect, dropDB, deleteAllCollectionsData } from './TestUtils'
chai.use(chaiHttp)
chai.use(chaiExclude)
chai.use(chaiAsPromised)

before('Open DB connection', function () {
  return dbConnect()
})

after('Close the DB', function () {
  return dropDB()
})

afterEach('should clear database', function () {
  return deleteAllCollectionsData()
})
