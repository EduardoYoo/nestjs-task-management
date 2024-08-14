import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task_management',
  entities: ['/src/entity/*.ts'],
  migrations: ['/src/migrations/*.ts'],
  migrationsRun: true,
  dropSchema: true,
  synchronize: true,
});
