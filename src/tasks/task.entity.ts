//Data Mapper Pattern
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

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
}
