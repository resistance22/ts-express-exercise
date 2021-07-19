import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.SERVER_PORT || 1337,
  host: process.env.SERVER_HOST || 'localhost',
  tokenSecret: process.env.TOKEN_SECRET,
  dbURI: process.env.DATABASE_URI
}
