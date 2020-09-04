import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { api } from '../config'
import routes from '../routes'

export default ({ app }) => {
  app.enable('trust proxy')
  app.use(cors())
  app.use(bodyParser.json())
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(api.prefix, routes)

  app.get('/status', (req, res) => {
    res.status(200).json({ status: 200, message: "Working successfuly!" }).end()
  })

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
}