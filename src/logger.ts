import pino from 'pino'
import dayjs from 'dayjs'

export default pino({
  prettyPrint: true,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
})
