import dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV
export default {
  port: process.env.SERVER_PORT || 1337,
  host: process.env.SERVER_HOST || 'localhost',
  tokenSecret: process.env.TOKEN_SECRET || 'verysecretkey',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refreshverysecret',
  dbURI: env === 'test' ? process.env.TEST_DATABASE_URI : process.env.DATABASE_URI,
  redisURI: process.env.REDIS_URI,
  redisDB: env === 'test' ? process.env.REDIS_TEST_DB : process.env.REDIS_DB
}
