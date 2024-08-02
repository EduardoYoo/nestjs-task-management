import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  //When eager is true, whenever a User object is fetched from the DB, the tasks will be fetched as well
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
