import pino from 'pino'
import dayjs from 'dayjs'
const env = process.env.NODE_ENV

const Logger = pino({
  prettyPrint: true,
  enabled: env !== 'test',
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
})

export default Logger
