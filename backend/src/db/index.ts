import 'reflect-metadata';
import chalk from 'chalk-template';
import { DataSource } from 'typeorm';
import ormConfig from './orm-config.js';

export const dataSource = new DataSource(ormConfig);

export default async function getDb(): Promise<DataSource> {
  console.log(chalk`{yellow 💻  Using {red Postgres} database}`);
  await dataSource.initialize();
  return dataSource;
}
