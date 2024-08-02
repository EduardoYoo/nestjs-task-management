//Data Mapper Pattern
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  //Properties defined here can be translated into columns in DB

  @PrimaryGeneratedColumn('uuid') //Automatically generates ID for all tasks
  id: string;

  @Column() //Tells TypeORM this will be a column, not just a random property
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  //Exclude user property when object is printed as plain text (avoid security breaches) e.g.: JSON
  @Exclude({ toPlainOnly: true })
  user: User;
}
