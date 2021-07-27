import config from '../config'
import { createNodeRedisClient } from 'handy-redis'
import Logger from '../logger'

const RedisClient = createNodeRedisClient({
  host: config.redisURI,
  db: config.redisDB
})

RedisClient.nodeRedis.on('error', (err) => Logger.error(err))

export default RedisClient
