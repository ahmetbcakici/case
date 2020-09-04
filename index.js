import express from 'express'

import { api } from './config'

const app = express();
require('dotenv').config();

require('./loaders').default({ expressApp: app });

app.listen(api.port, (err) => {
  if (err) throw err;
  console.log(`Server is running on ${api.port}`)
})