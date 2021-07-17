import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiAsPromised from 'chai-as-promised'
import chaiHttp from 'chai-http'
import { dbConnect, dropDB, deleteAllCollectionsData } from './TestUtils'
chai.use(chaiHttp)
chai.use(chaiExclude)
chai.use(chaiAsPromised)

before('Open DB connection', async function () {
  await dbConnect()
})

after('Close the DB', async function () {
  await dropDB()
})
