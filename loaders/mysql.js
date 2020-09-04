import mysql from 'mysql';

import { api } from '../config'

export default async () => {
  const con = mysql.createConnection({
    host: api.dbHost,
    user: api.dbUser,
    password: api.dbPass,
    database: api.dbName
  });

  con.connect(err => {
    if (err) throw err;
    console.log('Mysql connected')
  });
};