import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import mysql from 'mysql'
import morgan from 'morgan'

import { api } from './config'
import routes from './routes'

const app = express()

export const con = mysql.createPool({
  host: api.dbHost,
  user: api.dbUser,
  password: api.dbPass,
  database: api.dbName
})

app.enable('trust proxy')
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(api.prefix, routes)

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err['status'] = 404
  err['documentation_url'] = 'http://localhost:8080/api/docs'
  next(err)
})

/// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  const errors = {
    status: err.status,
    message: err.message,
    documentation_url: err.documentation_url
  }
  res.json({ errors })
})

if (process.env.NODE_ENV !== 'test') /* if statement to solve jest EADDRINUSE error */
  app.listen(api.port, (err) => {
    if (err) throw err
    console.log(`Server is running on ${api.port}`)
  })

export default app