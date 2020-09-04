import mysql from 'mysql';

import { api } from '../config'

export const con = mysql.createPool({
  host: api.dbHost,
  user: api.dbUser,
  password: api.dbPass,
  database: api.dbName
});