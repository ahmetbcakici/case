import expressLoader from './express';
import mysqlLoader from './mysql';

export default async ({ expressApp }) => {
  // await mysqlLoader();

  await expressLoader({ app: expressApp });
};