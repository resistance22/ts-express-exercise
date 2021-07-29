import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiAsPromised from 'chai-as-promised'
import chaiHttp from 'chai-http'
import { dbConnect, dropDB, deleteAllCollectionsData, deleteRedisData } from './TestUtils'
chai.use(chaiHttp)
chai.use(chaiExclude)
chai.use(chaiAsPromised)

before('Open DB connection', async function () {
  return dbConnect()
})

after('Close the DB', async function () {
  return dropDB()
})

afterEach('should clear database', function (done) {
  deleteAllCollectionsData(done)
})
afterEach('should clear redis DB', function (done) {
  deleteRedisData(done)
})
