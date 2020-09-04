export { default as swaggerConfig } from './swagger.config';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, PORT } = process.env;

export const api = {
  port: PORT || 8080,
  dbHost: DB_HOST,
  dbUser: DB_USER,
  dbPass: DB_PASS,
  dbName: DB_NAME,
  prefix: "/api",
  specs: "/docs",
}