import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'postgres',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: 'todo_list',
  logging: true,
  // entities: [__dirname + '/../models/*.ts'],
  // migrations: [__dirname + '/migrations/*.ts'],
  entities: ['dist/models/*.js'],
  migrations: ['dist/migrations/*.js'],
});

export const initializeDatabase = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
};
