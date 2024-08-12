import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task_management',
  entities: [Task, User],
  migrations: ['/src/migrations/*.ts'],
  migrationsRun: true,
  dropSchema: true,
  synchronize: true,
});
