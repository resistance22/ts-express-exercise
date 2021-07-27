import dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV
export default {
  port: process.env.SERVER_PORT || 1337,
  host: process.env.SERVER_HOST || 'localhost',
  tokenSecret: process.env.TOKEN_SECRET || 'verysecretkey',
  dbURI: env === 'test' ? process.env.TEST_DATABASE_URI : process.env.DATABASE_URI
}
