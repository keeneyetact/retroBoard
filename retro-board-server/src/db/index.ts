import 'reflect-metadata';
import chalk from 'chalk';
import { Connection, createConnection } from 'typeorm';
import getOrmConfig from './orm-config';

export default async function getDb(): Promise<Connection> {
  console.log(chalk`{yellow 💻  Using {red Postgres} database}`);
  const connection = await createConnection(getOrmConfig());
  return connection;
}
