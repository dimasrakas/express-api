import type { Application } from 'express'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import { useMiddleware } from '@middleware/index.middleware'
import pino from 'pino-http'
import routes from './routes'

dotenv.config()
const app: Application = express()
const logger = pino({
  useLevel: 'silent',
  // Define custom serializers
  serializers: {
    req(req) {
      return {
        query: req.query,
        params: req.params,
        body: req.raw.body,
      }
    },
    res(res) {
      return 'Disabled'
    },
  },

})
app.use(logger)

// set security HTTP headers
app.use(helmet())

// set middleware
app.use(useMiddleware)
app.use(cors())
app.use(express.json())
app.use('/', routes)

// Run Server
app.listen(3000, () => console.log('🚀 Server ready at: http://localhost:3000'))

