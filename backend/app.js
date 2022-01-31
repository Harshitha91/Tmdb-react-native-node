import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cron from 'node-cron'
import errorHandler from './api/middleware/error-handler'
import logger from './api/middleware/logger'
import apiRoutes from './api/routes/api'
import { getMovies } from './api/services/movies'
import { config } from 'dotenv'
import db from './api/helpers/connections/db'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json())

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  }),
)

// global error handler
app.use(logger)

app.use('/api', apiRoutes)

cron.schedule('0 0 * * *', function () {
  getMovies()
})

// global error handler
app.use(errorHandler)

const port = process.env.APP_PORT || 4000
app.listen(port, () => {
  console.log(`App is listening to port ${port}`)
  getMovies()
})

export default app
