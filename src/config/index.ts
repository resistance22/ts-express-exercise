import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.SERVER_PORT || 1337,
  host: process.env.SERVER_HOST || 'localhost',
  dbURI: process.env.DATABASE_URI
}
